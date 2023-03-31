const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0 text-center">
            <span className="font-semibold">
              AAANH LABS
            </span>
            <p className="text-sm">&copy; {new Date().getFullYear()} <a href="https://aaanh.com">Anh H Nguyen</a>. All Rights Reserved.</p>
            <p className="text-sm"><a className="link-info hover:underline underline-offset-4" href="https://github.com/aaanh/gpt-test-bench.git">Source code on Github</a></p>
          </div>
          <div className="w-full md:w-auto text-center md:text-right">
            <p className="text-white mx-2">
              GPT models and responses are provided through paid OpenAI&apos;s API.
            </p>
            <p className="text-white mx-2">
              ⚠️ Internal uses, PoC, demos, not production.
            </p>
            {/* <p className="text-white mx-2">
              <a className="link-info hover:underline underline-offset-4" href="https://ko-fi.com/aaanh">
                Sponsor this project 💖
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;