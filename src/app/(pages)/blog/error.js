"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <div className="flex align-middle justify-center pt-20">
        <div className="flex-container">
          <div className="text-center">
            <h1 className="!pt-[90px] text-center">
              {error}
              <span className="!text-[5rem] mr-2" id="digit1">
                4
              </span>
              <span className="!text-[5rem] m-2" id="digit2">
                0
              </span>
              <span className="!text-[5rem] ml-2" id="digit3">
                4
              </span>
            </h1>
            <h3 className="text-[3rem] pb-[3rem] text-center ">
              Something went wrong!
            </h3>
            <div className="md:pb-[4rem] pb-8">
              <div className="w-[30%] inline-flex justify-center align-middle p-3 rounded bg-colorBlack text-colorWhite">
                <button className="text-[18px]" onClick={() => reset()}>
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
