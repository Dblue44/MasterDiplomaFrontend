import { ImageUploadWidget } from '@/widgets';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-6 border border-black-200 dark:border-white-800 rounded-md p-4">
      <ImageUploadWidget onUploadSuccess={() => {
        navigate('/images');
      }}/>
    </div>
  );
}