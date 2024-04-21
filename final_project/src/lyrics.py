import lyricsgenius
import requests
# Scrape data from an HTML document
from bs4 import BeautifulSoup
# I/O
import os
# Search and manipulate strings
import re
import time

GENIUS_API_TOKEN= 'DtP-ys_dzjNc76k_1tlslraP6whcgQLIYO_rk1rZLrPacAI8fKKTpNfrICXQmuzw'
genius = lyricsgenius.Genius(GENIUS_API_TOKEN)

os.makedirs("lyrics", exist_ok=True)
def lyrics(artist_name, number_of_songs):
    all_lyrics = []
    artist = genius.search_artist(artist_name, max_songs=number_of_songs)
    for song in artist.songs:
        lyrics = song.lyrics  # Extract the lyrics from the song object

    # Remove content within brackets (round or square)
        lyrics = re.sub(r"[\(\[].*?[\)\]]", "", lyrics)

    # Join non-empty lines
        lyrics = os.linesep.join([s for s in lyrics.splitlines() if s])

    # Remove the first line and join the rest
        lines = lyrics.split("\n")[1:] 
     # Remove the first line
        lyrics_text = "\n".join(lines)

        # Remove text with "get tickets" (for some reason was in every single lyric scrape, regardless of
        # of author)
        lyrics_text2 = re.sub(r".*Get tickets.*as low as.*(\r?\n|\r)?", "", lyrics_text, flags=re.IGNORECASE)
        # Remove text with "Embed"
        lyrics_text3 = re.sub(r"\d+Embed", "", lyrics_text2, flags=re.IGNORECASE)

    # Add this song's lyrics to the cumulative list
        all_lyrics.append(lyrics_text3)

    file_name = os.path.join("lyrics", artist_name.lower() + '.txt')
    with open(file_name, 'w', encoding='utf-8') as f:
        f.write("\n\n---\n\n".join(all_lyrics))
lyrics("Ed Sheeran", 4)