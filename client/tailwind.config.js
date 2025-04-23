export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'custom-blue': 'rgb(135, 165, 216)',
          'custom-mid-blue': 'rgb(230, 236, 246)',
          'custom-lightest-blue': 'rgb(230, 236, 246)',
        },
        backgroundImage: {
          'custom-gradient': 'linear-gradient(90deg, rgba(105, 140, 200, 1) 0%, rgba(167, 190, 232, 1) 0%, rgba(216, 221, 240, 1) 100%)',
        },
        clipPath: {
          'polygon-custom': 'polygon(20% 0%, 100% 33%, 100% 100%, 0% 100%)',
        }
      },
    },
   
  };


  //rgb(30, 69, 136)