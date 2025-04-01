import React, { useState } from 'react';
import { User, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

// We'll replace zod validation with basic form validation
function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    otp: '',
    dob: null,
    role: '',
    urls: ['']
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      dob: date
    }));
  };

  const handleAddUrl = () => {
    setFormData(prev => ({
      ...prev,
      urls: [...prev.urls, '']
    }));
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...formData.urls];
    newUrls[index] = value;
    setFormData(prev => ({
      ...prev,
      urls: newUrls
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="bg-gray-800 sm:min-h-screen w-full flex justify-center items-center py-6 md:py-0">
        <div
          className="bg-black w-full p-1rem rounded-lg flex flex-col items-center justify-center p-4 md:p-8"
          style={{ height: '100%' }}
        >
          <div className="flex flex-col items-center justify-center">
            <section className="flex flex-col items-center justify-center w-full p-6 mt-5 space-y-4 text-white rounded-lg shadow-lg md:ml-5">
              <div className="rounded-full overflow-hidden w-24 h-24 md:w-32 md:h-32 mb-4 bg-gray-700 flex items-center justify-center">
                <User className="w-16 h-16 md:w-20 md:h-20 text-white cursor-pointer" />
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6 w-full">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                      id="first-name"
                      name="firstName"
                      placeholder="Enter your first name"
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                      id="last-name"
                      name="lastName"
                      placeholder="Enter your last name"
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="user-name">Username</label>
                  <input
                    className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                    id="user-name"
                    name="username"
                    placeholder="Enter your username"
                    required
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <input
                    className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <div className="flex-1 space-y-2">
                    <label htmlFor="phone-number">Phone Number</label>
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-950 text-gray-400 py-2 px-3 rounded-md border border-gray-300">
                        +91
                      </div>
                      <input
                        className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                        id="phone-number"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        required
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button 
                      type="button"
                      className="bg-gray-600 text-white hover:bg-gray-800 py-2 px-4 rounded"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label>One-Time Password</label>
                  <div className="flex space-x-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-10 h-10 text-center rounded border bg-gray-950"
                        name="otp"
                        value={formData.otp[index] || ''}
                        onChange={(e) => {
                          const newOtp = formData.otp.split('');
                          newOtp[index] = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            otp: newOtp.join('')
                          }));
                        }}
                      />
                    ))}
                  </div>
                  <button 
                    type="button"
                    className="bg-gray-600 text-white hover:bg-gray-800 py-2 px-4 rounded mt-2"
                  >
                    Verify
                  </button>
                </div>

                <div className="space-y-2">
                  <label>Date of Birth</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                      onChange={(e) => handleDateChange(new Date(e.target.value))}
                      max={new Date().toISOString().split('T')[0]}
                      min="1900-01-01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="role">Current Role</label>
                  <select
                    className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4]"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled hidden>Choose your role</option>
                    <option value="software-engineer">Software Engineer</option>
                    <option value="data-scientist">Data Scientist</option>
                    <option value="ux-designer">UX UI Designer</option>
                    <option value="project-coordinator">Project Coordinator</option>
                    <option value="product-manager">Product Manager</option>
                    <option value="qa">Quality Assurance</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label>URLs</label>
                  {formData.urls.map((url, index) => (
                    <input
                      key={index}
                      className="block w-full rounded-md border border-gray-300 bg-gray-950 py-2 px-3 text-gray-400 placeholder-gray-500 focus:border-[#00b8d4] focus:outline-none focus:ring-[#00b8d4] mb-2"
                      placeholder="Enter URL of your account"
                      type="url"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      required
                    />
                  ))}
                  <button 
                    type="button"
                    onClick={handleAddUrl}
                    className="bg-gray-600 text-white hover:bg-gray-800 py-2 px-4 rounded"
                  >
                    Add URL
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00b8d4] text-white py-2 rounded hover:bg-[#009fbf] transition duration-300"
                >
                  Submit Profile
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;