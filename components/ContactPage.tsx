
import React, { useState } from 'react';
import { Page } from '../types';

interface ContactPageProps {
    setActivePage: (page: Page) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setActivePage }) => {
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmissionStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setSubmissionStatus('success');
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center space-x-4">
                <button onClick={() => setActivePage(Page.Help)} className="text-gray-500 hover:text-amber-500 p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Go back">
                    <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
                    <p className="text-gray-500">We're here for you.</p>
                </div>
            </div>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                <h3 className="font-bold text-lg text-amber-800">Contact a Specialist</h3>
                <p className="text-amber-700 mt-1 mb-2">For professional guidance, you can reach out to our affiliated speech-language therapists.</p>
                <div className="text-sm">
                    <p className="font-semibold text-amber-800">University of Auckland Speech Science</p>
                    <p className="text-amber-700">Email: <a href="mailto:speech-science@auckland.ac.nz" className="underline">speech-science@auckland.ac.nz</a></p>
                    <p className="text-amber-700">Phone: <a href="tel:+6493737599" className="underline">+64 9 373 7599</a></p>
                </div>
            </div>

            <div>
                {submissionStatus === 'success' ? (
                    <div className="text-center p-8 bg-green-50 rounded-lg animate-popIn">
                        <div className="mx-auto w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                           <i className="fas fa-check text-white text-3xl checkmark-pop"></i>
                        </div>
                        <h4 className="text-xl font-semibold text-green-800">Message Sent!</h4>
                        <p className="text-green-700 mt-2">Thank you for reaching out. We'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-group">
                            <input type="text" id="name" name="name" value={formState.name} onChange={handleInputChange} required className="form-input mt-1 block w-full pr-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="Full Name" />
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <i className="fas fa-user form-icon"></i>
                        </div>
                        <div className="form-group">
                             <input type="email" id="email" name="email" value={formState.email} onChange={handleInputChange} required className="form-input mt-1 block w-full pr-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="Email Address" />
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <i className="fas fa-envelope form-icon"></i>
                        </div>
                         <div className="form-group">
                             <input type="text" id="subject" name="subject" value={formState.subject} onChange={handleInputChange} required className="form-input mt-1 block w-full pr-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="Subject" />
                            <label htmlFor="subject" className="form-label">Subject</label>
                             <i className="fas fa-comment-alt form-icon"></i>
                        </div>
                        <div className="form-group">
                            <textarea id="message" name="message" rows={4} value={formState.message} onChange={handleInputChange} required className="form-input mt-1 block w-full pr-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm placeholder-transparent focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="Your Message"></textarea>
                            <label htmlFor="message" className="form-label">Your Message</label>
                             <i className="fas fa-pencil-alt form-icon"></i>
                        </div>
                        <button type="submit" disabled={submissionStatus === 'sending'} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-all duration-200">
                            {submissionStatus === 'sending' ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Sending...
                                </>
                            ) : 'Send Message'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ContactPage;