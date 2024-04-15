/**
 * Finite State Machine (FSM) class for managing state transitions with strong typing.
 *
 * @typeparam State The type of the state values (restricted to strings).
 * @typeparam Event The type of the event values (restricted to strings).
 */
export class FSM<State extends string, Event extends string> {
  /** The current state of the FSM. */
  private state: State;

  /**
   * A map of state transitions. The outer key iterates over all states,
   * the inner key iterates over all events, and the value is the next state
   * to transition to for that state-event combination. The value can be
   * undefined, indicating no transition occurs for that event in that state.
   */
  private transitions: { [K in State]: { [L in Event]?: State } };

  /**
   * An array of listener functions to be called whenever the state changes.
   * Each listener function takes no arguments and returns nothing.
   */
  private listeners: (() => void)[];

  /**
   * Optional variable to store the previous state before the last transition.
   */
  private previousState?: State;

  /**
   * Constructor for the FSM.
   *
   * @param initialState The initial state of the FSM.
   * @param transitions An object defining the state transitions.
   */
  constructor(
    initialState: State,
    transitions: { [K in State]: { [L in Event]?: State } }
  ) {
    this.state = initialState;
    this.transitions = transitions;
    this.listeners = [];
  }

  /**
   * Attempts to transition the FSM to a new state based on a given event.
   *
   * @param event The event that triggers the state transition.
   */
  transition(event: Event): void {
    const nextState = this.transitions[this.state][event];
    if (nextState) {
      this.previousState = this.state;
      this.state = nextState;
      this.notifyListeners();
    } else {
      console.warn(`Event '${event}' not defined for state '${this.state}'`);
    }
  }

  /**
   * Sets the FSM to a specific state directly.
   *
   * @param targetState The target state to transition to.
   */
  goToState(targetState: State): void {
    if (!this.transitions[targetState]) {
      console.warn(`State '${targetState}' does not exist`);
      return;
    }

    this.state = targetState;
    this.notifyListeners();
  }

  /**
   * Returns the current state of the FSM.
   *
   * @returns The current state.
   */
  getState(): State {
    return this.state;
  }

  /**
   * Returns the previous state of the FSM, or undefined if there was no previous state.
   *
   * @returns The previous state, or undefined.
   */
  getPreviousState(): State | undefined {
    return this.previousState;
  }

  /**
   * Adds a listener function to be called whenever the state changes.
   *
   * @param listener The listener function to be added.
   */
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  /**
   * Removes a listener function from the list of listeners.
   *
   * @param listener The listener function to be removed.
   */
  removeListener(listener: () => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  /**
   * Notifies all registered listeners about the state change.
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}
