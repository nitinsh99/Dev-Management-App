import Spinner from '../Spinner/Spinner';

const withSpinnerHOC = (WrappedComponent, loaded) => {
  if (loaded === false) {
    return Spinner;
  } else {
    return WrappedComponent;
  }
};

export default withSpinnerHOC;
