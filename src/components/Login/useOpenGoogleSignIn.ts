export const useOpenGoogleSignIn = () => {
  return (isHidden: boolean): void => {
    const getElem = document.getElementById('signInDiv');
    if (!getElem) return;
    getElem.hidden = isHidden;
  };
};