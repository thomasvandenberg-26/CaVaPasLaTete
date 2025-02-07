/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

      fontFamily: {
        primary: 'Roboto',
        nunito: 'Nunito'
      },
      backgroundColor: {
        yellow_sun: '#DAB84A',
        blancbleu: '#E2F0EF',
        header: '#A9D4D6',
        green : '#42A390',

        bleubleu : '#82C3C5',
        testblanc: '#F6F5F1',
      },
      textColor : {
        light_gray: '#90A6B4',
        green : '#42A390',
        rouge: '#C46960',
        bleubleubleu : '#82C3C5',
        bleucanard : '#065758'

      },
      borderColor :{
        blue_light : '#0277A2',
        bleu : '#82C3C5',
        bleucanard: '#065758',
        vertvertvert: '#42A390'

      },


    },
  },
  plugins: [],
}
