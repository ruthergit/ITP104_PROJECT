/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Blue: "#0B192C",
        Red: "#FF4C4C",
        Green: "#4CAF50",
        Orange: "#FF7F50",
        BorderBlue: "#1E3E62",
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({addUtilities}){
      const newUtilities = {
        ".scrollbar-thin" : {
           scrollBarWidth: "thin",
           scrollbarColor: "#1E3E62"
        },
        ".scrollbar-webkit":{
          "&::-webkit-scrollbar" : {
            width: "6px"
          },
          "&::-webkit-scrollbar-track" : {
            background: "#0B192C",
            marginTop: "6px",
          },
          "&::-webkit-scrollbar-thumb" : {
            background: "#1E3E62",
            borderRadius: "20px",
            
            
          }
        }
      }
      addUtilities(newUtilities,["responsive", "hover"])
    }
  ],  
};
