import { GetStaticProps } from "next";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <span className="font-semibold">
              ⚗️ AAANH LABS
            </span>
            <p className="text-sm">&copy; {new Date().getFullYear()} <a href="https://aaanh.com">Anh H Nguyen</a>. All Rights Reserved.</p>
            <p className="text-sm"><a className="link-info hover:underline underline-offset-4" href="https://github.com/aaanh/gpt-playground.git">Source code on Github</a></p>
          </div>
          <div className="w-full md:w-auto text-center md:text-right">
            <p className="text-white mx-2">
              GPT models and responses are provided through paid OpenAI&apos;s API.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;