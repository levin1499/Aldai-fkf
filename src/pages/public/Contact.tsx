import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "0798079720",
      description: "Call us during office hours"
    },
    {
      icon: Mail,
      title: "Email",
      details: "footballkenya.aldai@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Aldai Constituency, Nandi County",
      description: "Visit our office"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Mon - Fri: 8:00 AM - 5:00 PM",
      description: "Saturday: 9:00 AM - 1:00 PM"
    }
  ];

  const departments = [
    {
      name: "Player Registration",
      email: "registration@fkfaldai.org",
      phone: "0798079720",
      description: "For player registration and verification inquiries"
    },
    {
      name: "Club Management",
      email: "clubs@fkfaldai.org", 
      phone: "0798079720",
      description: "For club licensing and management support"
    },
    {
      name: "Youth Development",
      email: "youth@fkfaldai.org",
      phone: "0798079720", 
      description: "For youth programs and training inquiries"
    },
    {
      name: "General Inquiries",
      email: "footballkenya.aldai@gmail.com",
      phone: "0798079720",
      description: "For general questions and information"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-cream to-qatar-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-qatar-maroon hover:text-qatar-darkMaroon transition-colors"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-qatar-gold">
            <div className="flex items-center mb-6">
              <div className="h-16 w-16 bg-qatar-gradient rounded-full flex items-center justify-center mr-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-qatar-maroon">Contact Us</h1>
                <p className="text-qatar-burgundy mt-2">Get in touch with FKF Aldai - we're here to help</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-qatar-cream text-center">
                  <div className="h-12 w-12 bg-qatar-lightGold rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 text-qatar-maroon" />
                  </div>
                  <h3 className="text-lg font-semibold text-qatar-maroon mb-2">{info.title}</h3>
                  <p className="text-qatar-burgundy font-medium mb-1">{info.details}</p>
                  <p className="text-qatar-burgundy text-sm">{info.description}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Form and Departments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
              <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-qatar-maroon mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-qatar-sand" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.name ? 'border-red-500' : 'border-qatar-cream'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                      {...register('name', { required: 'Name is required' })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-qatar-maroon mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-qatar-sand" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-qatar-cream'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-qatar-maroon mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-qatar-sand" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.phone ? 'border-red-500' : 'border-qatar-cream'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                      {...register('phone')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-qatar-maroon mb-1">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className={`block w-full px-3 py-3 border ${errors.subject ? 'border-red-500' : 'border-qatar-cream'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors`}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-qatar-maroon mb-1">
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-qatar-sand" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      className={`block w-full pl-10 pr-3 py-3 border ${errors.message ? 'border-red-500' : 'border-qatar-cream'} rounded-lg shadow-sm focus:ring-qatar-gold focus:border-qatar-gold transition-colors resize-none`}
                      {...register('message', { required: 'Message is required' })}
                    />
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-qatar-maroon bg-gold-gradient hover:from-qatar-lightGold hover:to-qatar-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-qatar-gold transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Departments */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
              <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Contact Departments</h2>
              <div className="space-y-6">
                {departments.map((dept, index) => (
                  <div key={index} className="border border-qatar-cream rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-qatar-maroon mb-2">{dept.name}</h3>
                    <p className="text-qatar-burgundy text-sm mb-3">{dept.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-qatar-gold mr-2" />
                        <a href={`mailto:${dept.email}`} className="text-qatar-burgundy hover:text-qatar-maroon">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-qatar-gold mr-2" />
                        <a href={`tel:${dept.phone}`} className="text-qatar-burgundy hover:text-qatar-maroon">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-qatar-cream">
            <h2 className="text-2xl font-bold text-qatar-maroon mb-6">Find Us</h2>
            <div className="bg-qatar-lightGold rounded-lg p-8 text-center">
              <MapPin className="h-16 w-16 text-qatar-maroon mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-qatar-maroon mb-2">FKF Aldai Office</h3>
              <p className="text-qatar-burgundy mb-4">
                Aldai Constituency<br />
                Nandi County, Kenya
              </p>
              <p className="text-qatar-burgundy text-sm">
                Our office is located in the heart of Aldai constituency, easily accessible 
                by public transport. We welcome visitors during office hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;