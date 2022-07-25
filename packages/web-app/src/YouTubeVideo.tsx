type YouTubeVideoProps = {
  src: string
}

const YouTubeVideo = ({ src }: { src: string }) => {
  return (
    <div className="youtube-container">
      <iframe
        title="YouTube"
        src={src}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  )
}
