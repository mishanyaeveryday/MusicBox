import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
