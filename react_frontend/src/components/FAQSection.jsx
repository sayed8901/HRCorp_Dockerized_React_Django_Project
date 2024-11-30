import Lottie from 'lottie-react';
import FAQs from '../../public/FAQ_Animation.json'

const FAQSection = () => {
  return (
    <div className="w-11/12 mx-auto my-28">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mb-10 text-center text-2xl sm:text-3xl font-semibold leading-9 tracking-tight">
          Got some query on your mind!
          <span className="text-gradient"> Check out FAQs</span>
        </h2>
      </div>

      <div className="sm:flex justify-center items-center gap-6">
        {/* Lottie Animation */}
        <div className="relative lg:w-1/2 mb-24 sm:mb-0">
          <div className="w-full lg:w-4/5 lg:ml-auto h-56  sm:h-96">
            <Lottie animationData={FAQs} loop={true} />
          </div>
        </div>

        <div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What are the company’s working hours?
            </div>
            <div className="collapse-content">
              <p>
                Our standard working hours are from 9:00 AM to 5:00 PM, Monday
                through Friday. We offer flexible working hours and remote work
                options, depending on the role and department.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How does the leave policy work?
            </div>
            <div className="collapse-content">
              <p>
                Employees are entitled to 20 days of paid leave per year, in
                addition to public holidays. Leave must be requested through our
                HR portal and approved by your manager. Unused leave can be
                carried over to the next year up to a maximum of 10 days.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What is the process for reporting a workplace issue?
            </div>
            <div className="collapse-content">
              <p>
                If you encounter any issues in the workplace, you should report
                them directly to your manager or HR. We also have a confidential
                reporting system available via our HR portal for sensitive
                issues.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              What is the company’s policy on remote work?
            </div>
            <div className="collapse-content">
              <p>
                We offer flexible remote work options for eligible positions.
                Employees can work from home up to two days a week, subject to
                approval by their manager. Full-time remote work may be
                considered for certain roles.
              </p>
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              How does the performance review process work?
            </div>
            <div className="collapse-content">
              <p>
                Performance reviews are conducted biannually, in June and
                December. During these reviews, employees will meet with their
                managers to discuss performance, set goals, and identify areas
                for development. Feedback is encouraged throughout the year, not
                just during formal reviews.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
