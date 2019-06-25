export const Init = (state) => ({
  ...state,
  counter: 0
})

const Increment = (state) => ({
  ...state,
  counter: state.counter + 1
})

const Decrement = (state) => ({
  ...state,
  counter: state.counter - 1
})

export default (state) => (
  <div>
    <h2>Simple counter component</h2>
    <p>It's code, view and logic was loaded asynchronously.</p>
    <p>Notice how it's still using the global app state.</p>
    <p>Have a look at it's code <a href="https://github.com/loteoo/hyperapp-site-generator-demo/blob/master/src/app/pages/Counter.jsx" target="_blank" rel="noopener noreferrer">here</a>!</p>
    <h1>{state.counter}</h1>
    <button onclick={Decrement}>-</button>
    <button onclick={Increment}>+</button>
  </div>
)
