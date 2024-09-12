

export default function Discription() {
  return (
    <div className="flex flex-col justify-center min-w-full items-center text-center text-lg text-fuchsia-200 hover:text-amber-100 font-mono">
      Type Racer is a fast-paced typing game designed to test and improve your
      typing speed and accuracy. The game pits players against each other in a
      race to type a series of words as quickly and correctly as possible.Type
      Racer offers an engaging and competitive environment for improving typing
      skills while having fun.
      <footer className="text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">About Us</h3>
              <p>
                We are committed to providing the best experience for typists of
                all levels. Our platform offers engaging and challenging typing
                races to help you improve your skills.
              </p>
            </div>

            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p className="mb-1">
                Email:{" "}
                <a
                  href="mailto:ashutoshchauhan1919@gmail.com"
                  className="hover:underline"
                >
                  ashutoshchauhan1919@gmail.com
                </a>
              </p>
              <p className="mb-1">Phone: +91 9555986066</p>
              <p className="mb-1">
                MMMUT Gorakhpur, 273010
              </p>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Type Racer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
