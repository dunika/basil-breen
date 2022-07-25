#!/bin/bash
IFS=$'\n'

parse_files() {
  EXT=$1
  echo $EXT
  for FILE in `find ./videos/pending -name "*.$EXT" -type f`;do
    basename=$(basename "$FILE")
    outputFilename=$(echo "$basename" | sed "s/.$EXT/.mp4/")
    # HandBrakeCLI  --non-anamorphic --pixel-aspect 9:16 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    # HandBrakeCLI --crop 8:8:442:442 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    
    # HandBrakeCLI --crop 12:12:662:664 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    
    # HandBrakeCLI -i "$FILE" -o "./videos/landscape/$outputFilename" --optimize
    
    # --crop   <top:bottom:left:right>
    # 16/9
    # strd 1920 * 1080
    # base 1616 * 1076
    # trget 1536 * 864 / -80, -212
    # HandBrakeCLI --crop 106:106:40:40 -i   "$FILE" -o "./videos/landscrape/$outputFilename"
    
    
    
    # 9/16
    # strd 1080 * 1920
    # base 1616 * 1076
    # trget 594 * 1056 / -1022, 20
    # HandBrakeCLI --crop 20:0:510:512 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    
    
    # 9/16
    # strd 1080 * 1920
    # base 1536 * 864
    # 486 * 864 / -1050, 0
    # HandBrakeCLI --crop 0:0:524:522 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    
    # 9/16
    # strd 1080 * 1920
    # base 1920 * 1080
    # 594 * 1056 *  / -462, -486
    HandBrakeCLI --crop 12:12:660:664 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    # --preset "HQ 1080p30 Surround"
    
    # 9/16
    # strd 1080 * 1920
    # base 1280 * 720
    # 378 * 672 *  / -902, 0
    # HandBrakeCLI --crop 0:48:450:452 -i   "$FILE" -o "./videos/portrait/$outputFilename"
    
    
    if test -f "./videos/landscape/$outputFilename"; then
      rm "$FILE"
    fi
  done
}

# 1616 * 1076

# 1920 * 1080
# 480 * 3.4 =



# 404 * 269
# 1010 * 672.5


# 1212

parse_files 'mp4'
parse_files 'mov'

