function get_message_from_s3(message_id) {
  var client_s3, file, file_dict, incoming_email_bucket, incoming_email_prefix, object_http_path, object_path, object_s3;
  incoming_email_bucket = os.environ["MailS3Bucket"];
  incoming_email_prefix = os.environ["MailS3Prefix"];

  if (incoming_email_prefix) {
    object_path = incoming_email_prefix + "/" + message_id;
  } else {
    object_path = message_id;
  }

  object_http_path = `http://s3.console.aws.amazon.com/s3/object/${incoming_email_bucket}/${object_path}?region=${region}`;
  client_s3 = boto3.client("s3");
  object_s3 = client_s3.get_object({
    "Bucket": incoming_email_bucket,
    "Key": object_path
  });
  file = object_s3["Body"].read();
  file_dict = {
    "file": file,
    "path": object_http_path
  };
  return file_dict;
}

function create_message(file_dict) {
  var att, body_text, filename, mailobject, message, msg, recipient, sender, separator, subject, subject_original, text_part;
  sender = os.environ["MailSender"];
  recipient = os.environ["MailRecipient"];
  separator = ";";
  mailobject = email.message_from_string(file_dict["file"].decode("utf-8"));
  subject_original = mailobject["Subject"];
  subject = "FW: " + subject_original;
  body_text = "The attached message was received from " + separator.join(mailobject.get_all("From")) + ". This message is archived at " + file_dict["path"];
  filename = re.sub("[^0-9a-zA-Z]+", "_", subject_original) + ".eml";
  msg = new MIMEMultipart();
  text_part = new MIMEText(body_text, {
    "_subtype": "html"
  });
  msg.attach(text_part);
  msg["Subject"] = subject;
  msg["From"] = sender;
  msg["To"] = recipient;
  att = new MIMEApplication(file_dict["file"], filename);
  att.add_header("Content-Disposition", "attachment", {
    "filename": filename
  });
  msg.attach(att);
  message = {
    "Source": sender,
    "Destinations": recipient,
    "Data": msg.as_string()
  };
  return message;
}

function send_email(message) {
  var aws_region, client_ses, output, response;
  aws_region = os.environ["Region"];
  client_ses = boto3.client("ses", region);

  try {
    response = client_ses.send_raw_email({
      "Source": message["Source"],
      "Destinations": [message["Destinations"]],
      "RawMessage": {
        "Data": message["Data"]
      }
    });
  } catch (e) {
    if (e instanceof ClientError) {
      output = e.response["Error"]["Message"];
    } else {
      throw e;
    }
  }

  return output;
}

function lambda_handler(event, context) {
  var file_dict, message, message_id, result;
  message_id = event["Records"][0]["ses"]["mail"]["messageId"];
  console.log(`Received message ID ${message_id}`);
  file_dict = get_message_from_s3(message_id);
  message = create_message(file_dict);
  result = send_email(message);
  console.log(result);
}
