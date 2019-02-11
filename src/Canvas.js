import React, {Component} from 'react'

export default class Canvas extends Component {
    constructor(props) {
        super(props)
        this.brush = {
            x: 0,
            y: 0,
            color: "#000",
            size: 10,
            down: false
        }
        this.strokes = []
        this.currentStroke = null
        this.canvas = null
        this.context = null
        this.mouseEvent = this.mouseEvent.bind(this)
    }

    componentDidMount() {
        this.canvas = document.querySelector('#canvas')
        this.context = this.canvas.getContext('2d')
        this.canvas.addEventListener('mousedown', (e) => {
            this.brush.down = true;

            this.currentStroke = {
                color: this.brush.color,
                size: this.brush.size,
                points: [],
            };

            this.strokes.push(this.currentStroke);

            this.mouseEvent(e);
        })
        this.canvas.addEventListener('mouseup', (e) => {
            this.brush.down = false;
            this.mouseEvent(e);
            this.currentStroke = null;
        })
        this.canvas.addEventListener('mousemove', (e) => {
            if(this.brush.down)
                this.mouseEvent(e)
        })
        document.querySelector('#brush-size').addEventListener('input', (e) => {
            this.brush.size = parseInt(e.target.value)
        })
        document.querySelector('#color-picker').addEventListener('input', (e) => {
            this.brush.color = e.target.value
        })
    }

    mouseEvent(e) {
        let rect = this.canvas.getBoundingClientRect()
        this.brush.x = e.pageX - rect.x;
        this.brush.y = e.pageY - rect.y;

        this.currentStroke.points.push({
            x: this.brush.x,
            y: this.brush.y,
        });

        this.redraw();
    }

    redraw()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.lineCap = 'round';
        for (let i = 0; i < this.strokes.length; i++) {
            let s = this.strokes[i];
            this.context.strokeStyle = s.color;
            this.context.lineWidth = s.size;
            this.context.beginPath();
            this.context.moveTo(s.points[0].x, s.points[0].y);
            for (let j = 0; j < s.points.length; j++) {
                let p = s.points[j];
                this.context.lineTo(p.x, p.y);
            }
            this.context.stroke();
        }
    }

    render() {
        let canvasStyle = {}
        //canvasStyle.transform = "transform([{translateX: 'calc(50% - 50px)'}])"
        canvasStyle.backgroundColor = 'yellow'
        return (
            <div id="modal1" className="modal">
                <div className="modal-content" style={{padding: 0}}>
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'start'
                        }}>
                            <a className="waves-effect waves-green btn-flat" onClick={() => {
                                this.strokes.pop();
                                this.redraw();
                            }}>
                                <i className="material-icons">undo</i>
                            </a>
                            <input type="color" id="color-picker"/>
                            <p className="range-field">
                                <input type="range" min="0" max="45" defaultValue="10" id="brush-size"/>
                            </p>
                        </div>
                        <div>
                            <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {
                                this.strokes = []
                                this.currentStroke = null
                                this.redraw()
                            }}>
                                <i className="material-icons">close</i>
                            </a>
                            <a className="modal-close waves-effect waves-green btn-flat">
                                <i className="material-icons">check</i>
                            </a>
                        </div>
                    </div>
                    <canvas id="canvas" width={400} height={400} style={canvasStyle}/>
                </div>
            </div>
        )
    }
}