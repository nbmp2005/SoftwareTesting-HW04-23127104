# AI Critique (200–300 words)

In this assignment, I used an AI Agent toolkit to support requirement analysis, test data design, and Playwright code generation for three features: Forgot Password (FR-03), Order History (FR-11), and Discount Code Management (FR-17). The initial results helped quickly establish an automation framework, but they were not reliable enough to be used directly.

The biggest challenge was that the Agent initially misunderstood the requirements, attempting to read the SUT (System Under Test) source code instead of executing black-box testing through the user interface as mandated. During the context discovery phase, the AI capability occasionally made errors by confusing input field placeholder strings with button text, leading to widespread assertion failures in the generated test cases. Furthermore, despite having standard data files available, the AI sometimes hallucinated test data or generated improperly formatted emails.

Particularly when executing on an SUT containing real-world bugs (for example, in feature FR-03 where the system generated a 4-digit OTP instead of 6 digits as per specifications), the AI became confused and produced cascading errors in the test code. I resolved these issues by manually refining selectors using DevTools, standardizing data arrays, and enforcing dynamic wait strategies (such as waitForSelector) on the Agent.

The primary reason for the AI's mistakes is that it relies solely on static HTML structure reasoning without dynamic interaction experience, while tendentially treating the current UI state as the correct "Oracle." The most vital principle I learned is to always retain control: humans must define the expected results based on documentation, assess defects, and perform manual verification rather than delegating complete responsibility to the Agent.


