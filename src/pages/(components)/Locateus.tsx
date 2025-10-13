import React from "react";

const FindUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Find Us</h2>
        <p className="text-gray-600 mb-10">
          Visit any of our branches across Lagos, Ogun, Ondo, and Oyo State.
          We’re always close by to serve you better.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* IFO HEAD OFFICE */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden border-t-4 border-blue-800">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-blue-800">
                Ifo Branch (Head Office)
              </h3>
              <p className="text-gray-600">
                Beside Ijoko Bridge, Opposite Faith Pharmacy, Ifo LGA, Ogun
                State
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=Ijoko+Bridge+Ifo+Ogun+State&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>

          {/* ABULE-IJOKO */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-blue-800">
                Abule-Ijoko Branch
              </h3>
              <p className="text-gray-600">
                No 2 Shamong Street, Abule-Ijoko, Ifo LGA, Ogun State
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=Abule+Ijoko+Ifo+Ogun+State&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>

          {/* ONDO */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-blue-800">
                Ondo Branch
              </h3>
              <p className="text-gray-600">
                Beside Captain Cook, Brigadier Ademulegun Road, Ondo West LGA,
                Ondo State
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=Captain+Cook+Ademulegun+Road+Ondo+West+Ondo+State&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>

          {/* LAGOS */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-blue-800">
                Lagos Branch
              </h3>
              <p className="text-gray-600">
                Behind Townhall Odo Nla, Off Odongunyan, Ikorodu, Lagos State
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=Odo+Nla+Odongunyan+Ikorodu+Lagos+State&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>

          {/* IBADAN LAST */}
          <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-lg text-blue-800">
                Ibadan Branch
              </h3>
              <p className="text-gray-600">
                No 12 Aba-Odan, Alakia Adegbayi, Ibadan, Oyo State
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps?q=Aba-Odan+Alakia+Adegbayi+Ibadan&output=embed"
              width="100%"
              height="250"
              loading="lazy"
              className="border-0 w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
