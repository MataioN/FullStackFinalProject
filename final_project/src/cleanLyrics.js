// Utility function to clean lyrics
function cleanLyrics(lyrics) {
    // Replace carriage returns (\r) with newline characters (\n)
    return lyrics.replace(/\r/g, '\n');  // Ensure proper line breaks
  }
  
  // Export the function to use elsewhere
  export default cleanLyrics;
  