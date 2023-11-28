import ReactSlider from "react-slider";
import './Slider.css'


function Settings() {
    return(
        <div className="Settings">
            <label>Work Minutes</label>
            <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={45}
            min={1}
            max={120}
            />
            <label>Break Minutes</label>
            <ReactSlider
            className={'slider green'}
            thumbClassName={'thumb green'}
            trackClassName={'track'}
            value={45}
            min={1}
            max={120}
            />
            <label>Number of Intervals</label>
            <ReactSlider
            className={'slider'}
            thumbClassName={'thumb'}
            trackClassName={'track'}
            value={5}
            min={1}
            max={10}
            />
        </div>
    )
}

export default Settings;