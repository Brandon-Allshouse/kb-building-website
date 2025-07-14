import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Menu, X, Phone, Mail, MapPin, Check } from 'lucide-react';

const KBBuildingWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Portfolio images - replace with your actual project photos
  const portfolioItems = [
    {
      id: 1,
      image: "/images/portfolio/project1.jpg",
      title: "Modern Kitchen Renovation",
      description: "Complete kitchen transformation with custom cabinetry and premium finishes"
    },
    {
      id: 2,
      image: "/images/portfolio/project2.jpg",
      title: "Living Room Makeover",
      description: "Elegant living space renovation with custom trim work and painting"
    },
    {
      id: 3,
      image: "/images/portfolio/project3.jpg",
      title: "Bathroom Remodel",
      description: "Luxurious bathroom upgrade with modern fixtures and flooring"
    },
    {
      id: 4,
      image: "/images/portfolio/project4.jpg",
      title: "Office Space Design",
      description: "Professional workspace with custom built-ins and drywall finishing"
    }
  ];

  const services = [
    {
      title: "Drywall Installation & Finishing",
      description: "Expert installation and finishing for perfectly smooth, paint-ready walls with meticulous attention to every detail and seamless joints."
    },
    {
      title: "Premium Painting Services",
      description: "High-quality interior and exterior painting using premium materials and techniques for durable, beautiful finishes that last."
    },
    {
      title: "Flooring Installation",
      description: "Professional installation of laminate, vinyl, and luxury flooring solutions with precise fitting and lasting durability."
    },
    {
      title: "Precision Trim & Molding",
      description: "Detailed trim work and custom molding installation for that perfect finishing touch that elevates any space."
    },
    {
      title: "Custom Renovations",
      description: "Comprehensive renovation projects from concept to completion, transforming spaces to match your exact vision and needs."
    },
    {
      title: "Project Consultation",
      description: "Expert guidance and detailed planning services to ensure your project is completed on time, on budget, and beyond expectations."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [portfolioItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Top Left */}
            <div className="flex-shrink-0">
              <img 
                src={`${process.env.PUBLIC_URL}/images/kb-logo.png`}
                alt="KB Building Innovations Logo" 
                className="h-20 w-auto bg-white/90 rounded-lg px-3 py-2 shadow-lg"
                onError={(e) => {
                  console.log('Logo failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-blue-400 ${
                      isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-400'
                }`}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-8">
            <img 
              src={`${process.env.PUBLIC_URL}/images/kb-logo.png`}
              alt="KB Building Innovations Logo" 
              className="h-32 w-auto mx-auto mb-6 filter brightness-0 invert"
              onError={(e) => {
                console.log('Hero logo failed to load');
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Building Excellence
            <span className="block text-blue-300 text-3xl md:text-5xl mt-2">One Project at a Time</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Transform your space with expert contracting solutions. From precision drywall finishing to complete renovations, we bring your vision to life with unmatched craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get Your Free Quote
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            >
              View Our Services
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Our Expert Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in high-quality construction and renovation services, delivering exceptional results that exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-600"
              >
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our recent projects and see the quality craftsmanship that sets us apart.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {portfolioItems.map((item, index) => (
                  <div key={item.id} className="w-full flex-shrink-0 relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                About KB Building Innovations
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Led by owner <span className="font-semibold text-blue-800">Kole Bronowski</span>, 
                KB Building Innovations brings expertise and innovation to every project. We specialize in 
                drywall installation, premium painting, flooring, precision trim work, and custom renovations.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our commitment to delivering high-quality results tailored to your vision sets us apart. 
                We don't just build—we create spaces that inspire and endure.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Licensed & Insured</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">On-Time Delivery</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-700">Free Estimates</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-xl border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">Why Choose KB Building Innovations?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                      <Check className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Expert Craftsmanship</h4>
                      <p className="text-gray-600 text-sm">Years of experience delivering quality results</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                      <Check className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Licensed & Insured</h4>
                      <p className="text-gray-600 text-sm">Fully protected for your peace of mind</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                      <Check className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Quality Guaranteed</h4>
                      <p className="text-gray-600 text-sm">We stand behind every project we complete</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                      <Check className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">On-Time Completion</h4>
                      <p className="text-gray-600 text-sm">Reliable scheduling and timely project delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Contact us today for a free consultation and quote. Let's bring your vision to life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <a 
                href="tel:+17246989643" 
                className="text-blue-300 hover:text-white transition-colors duration-300 text-lg"
              >
                724-698-9643
              </a>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <a 
                href="mailto:koleb@kbbuildinginnovations.com" 
                className="text-blue-300 hover:text-white transition-colors duration-300 text-lg"
              >
                koleb@kbbuildinginnovations.com
              </a>
            </div>
            
            <div className="text-center group">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Service Area</h3>
              <p className="text-blue-300 text-lg">
                Western Pennsylvania & Surrounding Areas
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="tel:+17246989643"
              className="inline-flex items-center bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone size={20} className="mr-2" />
              Call Now for Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src={`${process.env.PUBLIC_URL}/images/kb-logo.png`}
                  alt="KB Building Innovations Logo" 
                  className="h-12 w-auto mr-4"
                  onError={(e) => {
                    console.log('Footer logo failed to load');
                    e.target.style.display = 'none';
                  }}
                />
                <h3 className="text-2xl font-bold">KB Building Innovations</h3>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Transforming spaces with expertise in drywall, painting, flooring, trim work, and renovations. 
                Led by Kole Bronowski, we bring innovation and excellence to every project.
              </p>
              <div className="flex space-x-4">
                <a href="tel:+17246989643" className="text-blue-400 hover:text-white transition-colors duration-300">
                  <Phone size={24} />
                </a>
                <a href="mailto:koleb@kbbuildinginnovations.com" className="text-blue-400 hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Drywall Installation</li>
                <li>Premium Painting</li>
                <li>Flooring Installation</li>
                <li>Trim Work</li>
                <li>Custom Renovations</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KB Building Innovations. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KBBuildingWebsite;