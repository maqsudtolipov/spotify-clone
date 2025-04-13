import toast from 'react-hot-toast';

const handleCopyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  toast.success('Link copied to clipboard');
};

export { handleCopyLink };
