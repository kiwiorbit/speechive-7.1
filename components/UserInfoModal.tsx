import React, { useState } from 'react';
import { UserInfo } from '../types';
import { EDUCATION_LEVELS, HOME_LANGUAGES } from '../constants';

interface UserInfoModalProps {
  isOpen: boolean;
  onSave: (info: UserInfo) => void;
  onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ isOpen, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    caregiverName: '',
    childName: '',
    childDob: '',
    parentalEducation: EDUCATION_LEVELS[0],
    homeLanguage: HOME_LANGUAGES[0],
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};
    const childNameRegex = /^[a-zA-Z\s]+$/;
    const hasNumberRegex = /\d/;

    // Caregiver Name Validation
    if (!formData.caregiverName.trim()) {
        newErrors.caregiverName = "Caregiver's name is required.";
    } else if (hasNumberRegex.test(formData.caregiverName)) {
        newErrors.caregiverName = 'Name cannot contain numbers.';
    }

    // Child Name Validation
    if (!formData.childName.trim()) {
        newErrors.childName = "Child's name is required.";
    } else if (!childNameRegex.test(formData.childName)) {
        newErrors.childName = 'Name can only contain letters and spaces.';
    }

    // Date of Birth Validation
    if (!formData.childDob) {
        newErrors.childDob = "Child's date of birth is required.";
    } else {
        const selectedDate = new Date(formData.childDob + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to compare dates only
        if (selectedDate > today) {
            newErrors.childDob = 'Date of birth cannot be in the future.';
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        const newUserInfo: UserInfo = {
            ...formData,
            honeyDrops: 0,
        };
        onSave(newUserInfo);
    }
  };
  
  const getBorderClass = (fieldName: keyof typeof errors) => errors[fieldName] ? 'border-rose-500' : 'border-gray-300';
  const inputStyles = `mt-1 block w-full px-3 py-2 md:py-4 bg-white border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 sm:text-sm md:text-lg`;
  const labelStyles = "block text-sm font-medium text-gray-700 md:text-lg";

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      <div 
        className="modal-content bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">Welcome to Speec<span className="text-amber-500">hive</span>!</h2>
          <p className="mt-2 text-gray-600 md:text-lg">Let's get you set up with a few details.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 md:space-y-6">
          <div>
            <label htmlFor="caregiverName" className={labelStyles}>Your Name</label>
            <input type="text" name="caregiverName" id="caregiverName" value={formData.caregiverName} onChange={handleInputChange} className={`${inputStyles} ${getBorderClass('caregiverName')}`} placeholder="e.g., Jane Doe" />
            {errors.caregiverName && <p className="text-rose-500 text-xs mt-1">{errors.caregiverName}</p>}
          </div>
          <div>
            <label htmlFor="childName" className={labelStyles}>Child's Name</label>
            <input type="text" name="childName" id="childName" value={formData.childName} onChange={handleInputChange} className={`${inputStyles} ${getBorderClass('childName')}`} placeholder="e.g., Alex" />
            {errors.childName && <p className="text-rose-500 text-xs mt-1">{errors.childName}</p>}
          </div>
          <div>
            <label htmlFor="childDob" className={labelStyles}>Child's Date of Birth</label>
            <input type="date" name="childDob" id="childDob" value={formData.childDob} onChange={handleInputChange} className={`${inputStyles} ${getBorderClass('childDob')}`} />
            {errors.childDob && <p className="text-rose-500 text-xs mt-1">{errors.childDob}</p>}
          </div>
          
          <div>
            <label htmlFor="parentalEducation" className={labelStyles}>Highest Parental Education</label>
            <select name="parentalEducation" id="parentalEducation" value={formData.parentalEducation} onChange={handleSelectChange} className={`${inputStyles} border-gray-300`}>
              {EDUCATION_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
            </select>
          </div>
          
          <div>
            <label htmlFor="homeLanguage" className={labelStyles}>Primary Home Language</label>
            <select name="homeLanguage" id="homeLanguage" value={formData.homeLanguage} onChange={handleSelectChange} className={`${inputStyles} border-gray-300`}>
              {HOME_LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full py-3 px-4 bg-amber-500 text-white font-bold rounded-lg shadow-md hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 md:text-lg">
              Start Your Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoModal;