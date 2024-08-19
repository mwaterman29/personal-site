type ReviewExtractionResult = {
    artistName: string;
    isAlbum: boolean;
    title: string;
    rating: number;
    trackRatings?: { name: string; rating: number }[];
  };
  
export const extractReviewDetails = (reviewText: string): ReviewExtractionResult => 
  {
    const lines = reviewText.split('\n').map(line => line.trim()).filter(line => line !== '');
    const artistName = lines[1];
    const title = lines[0];
    
    const trIndex = lines.findIndex(line => line.startsWith('Track Ratings:'));

    const trackRatings = lines
      .slice(trIndex) // Skip until track ratings start
      .filter(line => line.includes('-') && line.startsWith('Track Ratings:') === false)
      .map(line => {
        const [name, rating] = line.split(' - ');
        return { name, rating: parseFloat(rating) };
      });
  
    const isAlbum = trackRatings.length > 1;
    const rating = isAlbum ? trackRatings.reduce((acc, cur) => acc + cur.rating, 0) / trackRatings.length : trackRatings[0].rating;
  
    return {
      artistName,
      isAlbum,
      title,
      rating,
      trackRatings: isAlbum ? trackRatings : undefined,
    };
  };

export type { ReviewExtractionResult };