# ekono

Ekono is a system for building customisable AI pipelines by chaining a ton of models. There can be an infinite number of combinations. There's about 50 such types of models available. Each type having between 2 and 10 state of the art models.

## Getting Started

This section provides a quick overview of how to get started with ekono.

### Installation

```bash
pip install ekono
```
Contributing

## Contributing to ekono

Thank you for considering contributing to ekono! We appreciate your help in making ekono better. This document outlines the guidelines for contributing to the project.

**Ways to Contribute**

There are many ways to contribute to ekono, including:

*   **Reporting Bugs:** If you encounter a bug, please create a new issue on GitHub with a clear and concise description of the problem, including steps to reproduce it.
*   **Suggesting Enhancements:** Have an idea for a new feature or improvement? Submit an issue with a detailed explanation of your proposal.
*   **Writing Code:** Contribute new features, fix bugs, or improve the existing codebase by submitting pull requests.
*   **Improving Documentation:** Help us improve the documentation by fixing errors, adding new content, or making it more clear and concise.
*   **Testing:** Help us test new features and bug fixes to ensure they are working correctly.
*   **Spreading the Word:** Tell others about ekono and encourage them to use and contribute to the project.

**Setting up the Development Environment**

1.  **Fork the Repository:** Fork the ekono repository to your own GitHub account.
2.  **Clone the Fork:** Clone your forked repository to your local machine:

    ```bash
    git clone https://github.com/[your-username]/ekono.git
    cd ekono
    ```

3.  **Set up your environment:** (The specific setup steps depend on the project's technology stack. This is a general example and will need to be tailored.)

    *  **Install dependencies:**
       ```bash
       # Example using npm (Node.js project)
       npm install
       ```
    *  **Configure environment variables:**  Look for a `.env.example` or similar file and create a `.env` file based on it, filling in the necessary values.  The exact variables and their requirements will be project-specific and explained in the `README.md` or dedicated documentation.
    *  **Set up a database (if required):** The `README.md` or documentation should provide instructions on setting up the database.

4.  **Create a Branch:** Create a new branch for your changes:

    ```bash
    git checkout -b feature/your-feature-name
    ```

    or

    ```bash
    git checkout -b bugfix/your-bugfix-name
    ```

**Making Changes**

1.  **Make your changes:** Implement your feature, fix the bug, or improve the documentation.
2.  **Follow Coding Standards:** Adhere to the existing coding style and conventions used in the project.
3.  **Write Tests:** If you are adding new features or fixing bugs, please write unit tests to ensure that your changes are working correctly and do not introduce regressions.
4.  **Document your changes:**  Update documentation where relevant to reflect your changes, including API documentation, README files, or user guides.
5.  **Commit your changes:** Commit your changes with clear and concise commit messages:

    ```bash
    git add .
    git commit -m "feat: Add your feature description"
    ```

    or

    ```bash
    git commit -m "fix: Fix your bug description"
    ```

    Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) when possible.

**Submitting Pull Requests**

1.  **Push your branch:** Push your changes to your forked repository:

    ```bash
    git push origin feature/your-feature-name
    ```

2.  **Create a Pull Request:** Go to the ekono repository on GitHub and click the "Create Pull Request" button.
3.  **Describe your changes:** Provide a clear and concise description of your changes in the pull request description.
4.  **Link to the issue:** If your pull request addresses a specific issue, link to it in the pull request description using `#issue-number`.
5.  **Wait for Review:**  The project maintainers will review your pull request and may provide feedback or request changes.  Be responsive to feedback and address any requested changes.
6.  **Address Feedback:** Revise your changes as needed and push the updates to your branch. The pull request will automatically update.
7.  **Squash Commits (if requested):** The maintainers may ask you to squash your commits into a single commit before merging. This helps to keep the commit history clean.

**Code of Conduct**

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

**License**

By contributing to ekono, you agree that your contributions will be licensed under the [LICENSE](LICENSE) of the project.

Thank you again for your contributions!

License

MIT License
Repository

GitHub
