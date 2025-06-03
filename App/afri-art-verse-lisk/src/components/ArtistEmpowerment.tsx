
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  TrendingUp, 
  Globe, 
  Heart,
  Star,
  ArrowRight
} from "lucide-react";

export const ArtistEmpowerment = () => {
  const stats = [
    { number: "10K+", label: "Artists Ready to Join", color: "text-orange-600" },
    { number: "54", label: "African Countries", color: "text-red-600" },
    { number: "∞", label: "Growth Potential", color: "text-green-600" },
    { number: "0%", label: "Platform Fees", color: "text-blue-600" }
  ];

  const testimonials = [
    {
      name: "Amara Okafor",
      location: "Lagos, Nigeria",
      quote: "Finally, a platform that puts African artists first. No more middlemen taking our profits!",
      art: "Traditional Masks & Sculptures"
    },
    {
      name: "Kwame Asante",
      location: "Accra, Ghana",
      quote: "The royalty system means my art keeps earning for me even after the first sale. Revolutionary!",
      art: "Contemporary Paintings"
    },
    {
      name: "Zara Mthembu",
      location: "Cape Town, South Africa",
      quote: "Connecting my physical beadwork with digital ownership opens up a whole new world of collectors.",
      art: "Beadwork & Textiles"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-orange-900 via-red-900 to-orange-800 text-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering African Creativity
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            We believe African art deserves global recognition and fair compensation. 
            Our platform removes barriers and creates direct connections between artists and collectors worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-white/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 mb-16">
          <CardContent className="p-8 md:p-12 text-center">
            <Heart className="w-16 h-16 text-orange-300 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl leading-relaxed opacity-90 max-w-4xl mx-auto">
              To create a borderless, fair, and transparent marketplace where African artists can 
              tokenize their physical artwork, reach global audiences, and build sustainable income 
              streams through blockchain technology — all while maintaining full ownership and control 
              over their creative assets.
            </p>
          </CardContent>
        </Card>

        {/* Artist Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            What Artists Are Saying
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/70">{testimonial.location}</div>
                    <div className="text-xs text-orange-300 mt-1">{testimonial.art}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action for Artists */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Join the Revolution?</h3>
          <p className="text-xl mb-8 opacity-90">
            Be among the first African artists to mint and sell on AfriNFT
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-orange-900 hover:bg-gray-100 px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              Join Artist Waitlist
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              Learn More
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
