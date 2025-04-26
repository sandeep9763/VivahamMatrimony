import TestimonialCard from "@/components/ui/TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      content: "I found my partner within two months of joining Vivaham Matrimony. The platform is easy to use and has genuine profiles. Highly recommended!"
    },
    {
      name: "Lakshmi Reddy",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      content: "The verification process gave me confidence in the profiles I was browsing. I connected with my now-husband through Vivaham Matrimony. Thank you!"
    },
    {
      name: "Venkat Rao",
      location: "Chennai",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
      content: "As a parent, I was worried about finding the right match for my daughter. Vivaham Matrimony made the process simple and we found a wonderful family."
    }
  ];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from our satisfied users about their experience with Vivaham Matrimony.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              location={testimonial.location}
              image={testimonial.image}
              content={testimonial.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
