
interface GemstoneFullStoryProps {
  excerpt: string;
}

const GemstoneFullStory = ({ excerpt }: GemstoneFullStoryProps) => {
  const fullStory = `${excerpt} 

After hours of hiking through unmarked trails, we finally reached this incredible hidden gem. The locals had whispered about this place, but few tourists ever make the journey. The path was challenging, winding through dense forest and over rocky terrain, but every step was worth it.

As we approached, the sound of rushing water grew louder, and suddenly, there it was - a magnificent waterfall cascading down moss-covered rocks into a crystal-clear pool below. The mist created tiny rainbows in the afternoon sunlight, and the whole scene felt like something out of a fairy tale.

We spent the entire afternoon there, taking photos, swimming in the surprisingly warm water, and just soaking in the incredible atmosphere. It's moments like these that remind me why I fell in love with travel in the first place.

If you're planning to visit, I recommend bringing sturdy hiking boots and plenty of water. The best time to visit is early morning when the light hits the falls perfectly, though afternoon visits offer the rainbow effect I mentioned.

This place will forever hold a special place in my heart, and I hope it remains as pristine and magical for future travelers to discover.`;

  return (
    <div id="full-story-section" className="border-t bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h3 className="text-2xl font-serif font-bold text-wandora-charcoal mb-6">The Complete Story</h3>
        <div className="prose max-w-none text-wandora-charcoal/80 leading-relaxed whitespace-pre-line">
          {fullStory}
        </div>
      </div>
    </div>
  );
};

export default GemstoneFullStory;
