import PropTypes from 'prop-types';

//Para usar esto invoquenlo y utilizen una propiedad de "size" para el tamaño: sm(pequeño), md(medio), lg(largo), xl(grande);  y utilizen un color: blue, darkBlue, green, violet. Gaston

const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'border-secondary',
    darkBlue: 'border-primary',
    green: 'border-green-500',
    violet: 'border-light-violet'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin ${colorClasses[color]} border-t-transparent`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['blue', 'darkBlue', 'green', 'violet']),
};

export default LoadingSpinner;
