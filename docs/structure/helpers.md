# Helpers

Helpers folder are collection of function that resuable inside project.
A helper file may have single or multiple exported function. these are some rule

Rule of helpers

- Do not import 3rd party script/plugin. if you want it consider write it in service / lib
- Do not create variable outside function.
  ::: danger Don't

  ```js
  const a = "string";
  function someHelper() {
    return `${a} with suffix`;
  }
  ```

  :::

  ::: tip Do

  ```js
  function someHelper() {
    const a = "string";
    return `${a} with suffix`;
  }
  ```

  :::
