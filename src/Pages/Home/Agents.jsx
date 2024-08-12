import AgentsSlider from './AgentsSlider';

const Agents = () => {
  return (
    <div className="w-full overflow-hidden mx-auto text-black">
      <div className="text-center  mb-10">
        <p className="font-bold">Meet With Our </p>
        <h1 className="text-5xl font-bold text-[#ff4153]">Best Agents</h1>
        <p>
          With the “list agents short code” you can show your agents in any
          page, along side with their <br /> contact details and link to their
          agent profile.
        </p>
        <AgentsSlider />
      </div>
    </div>
  );
};

export default Agents;
