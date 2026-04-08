const STORAGE_BASE_URL = 'https://api.bhcjobs.com/storage';

export const getIndustryImage = (imageName: string) => {
  if (!imageName) return '';
  return `${STORAGE_BASE_URL}/industry-image/${imageName}`;
};

export const getCompanyImage = (imageName: string) => {
  if (!imageName) return '';
  return `${STORAGE_BASE_URL}/company-image/${imageName}`;
};
