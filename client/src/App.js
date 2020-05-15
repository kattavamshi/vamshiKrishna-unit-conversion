import React, {
  Component
} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      source: '',
      target: '',
      response: '',
      output: '',
      error: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleTargetChange = this.handleTargetChange.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ input: event.target.value });
  }

  handleSourceChange(event) {
    this.setState({ source: event.target.value });
  }

  handleTargetChange(event) {
    this.setState({ target: event.target.value });
  }

  handleResponseChange(event) {
    this.setState({ response: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ output: '' });
    if(!this.state.input){
      this.setState({ error: 'Input Numerical Value is mandatory' });
      return;
    } else  if(!this.state.source){
      this.setState({ error: 'Input Unit of Measure is mandatory' });
      return;
    } else  if(!this.state.target){
      this.setState({ error: 'Target Unit of Measure is mandatory' });
      return;
    } else  if(this.state.source === this.state.target){
      this.setState({ error: 'Input Unit of Measure and Target Unit of Measure should not be same' });
      return;
    } else  if(!this.checkSourceTargetSameUnitType()){
      this.setState({ error: 'Input Unit of Measure and Target Unit of Measure should not be same unit type of measure' });
      return;
    } else  if(!this.state.response){
      this.setState({ error: 'Student Response is mandatory' });
      return;
    }else{
      this.setState({ error: '' });
    }
    this.checkConversion();
  }

  checkSourceTargetSameUnitType(){
    const temperature = ['celsius', 'fahrenheit', 'kelvin', 'rankine'];
    const volume = ['litres', 'tablespoons', 'cubicinches', 'cups', 'cubicfeet', 'gallons'];

    if((temperature.includes(this.state.source) && temperature.includes(this.state.target)) ||
      (volume.includes(this.state.source) && volume.includes(this.state.source))){
      return true;
    } else{
      return false;
    }
  }

  checkConversion(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };
  
    fetch("http://localhost:3001/conversion", requestOptions)
    .then(response => response.json())
    .then(response => this.setState({
      output: response.output
    }));
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
        <h1>Unit Conversion</h1>
        <div className="section">
          <label className="label">
            Input Numerical Value:
            <input type="text" value={this.state.input} onChange={this.handleInputChange} />
          </label>
        </div>
        <div className="section">
          <label className="label">
            Input Unit of Measure:
            <select value={this.state.source} onChange={this.handleSourceChange}>
              <option></option>
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
              <option value="kelvin">Kelvin</option>
              <option value="rankine">Rankine</option>
              <option value="litres">Litres</option>
              <option value="tablespoons">Tablespoons</option>
              <option value="cubicinches">Cubic Inches</option>
              <option value="cups">Cups</option>
              <option value="cubicfeet">Cubic Feet</option>
              <option value="gallons">Gallons</option>
            </select>
          </label>
        </div>
        <div className="section">
          <label className="label">
           Target Unit of Measure:
            <select value={this.state.target} onChange={this.handleTargetChange}>
              <option></option>
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
              <option value="kelvin">Kelvin</option>
              <option value="rankine">Rankine</option>
              <option value="litres">Litres</option>
              <option value="tablespoons">Tablespoons</option>
              <option value="cubicinches">Cubic Inches</option>
              <option value="cups">Cups</option>
              <option value="cubicfeet">Cubic Feet</option>
              <option value="gallons">Gallons</option>
            </select>
          </label>
        </div>
        <div className="section">
          <label className="label">
            Student Response:
            <input type="text" value={this.state.response} onChange={this.handleResponseChange} />
          </label>
        </div>
        {this.state.error && this.state.error !== '' &&
          <div className="error">
            <span>{this.state.error}</span>
          </div>
        }
        {this.state.output && this.state.output !== '' &&
          <div className="output">
            <span>{this.state.output}</span>
          </div>
        }
        <button type="submit" className="button">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;