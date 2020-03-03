import Konva from 'konva';
import { TextStyle, Decoration } from '../catalog/generate/catalog-model';

export class Page {
    id = 0;
    stage: Konva.Stage;
    layer: Konva.Layer;
    width = 0;
    height = 0;
    elements: Konva.Node[] = [];

    constructor(id:number, width: number, height: number) {
        this.id = id;
        this.width = width;
        this.height = height;
    }

    drawPage() {
        this.stage = new Konva.Stage({
            container: `page-${this.id}`,
            width: this.width,
            height: this.height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
    } 

    public addImage = (img: string, x: number = 50, y: number = 50, width: number = 100, height: number = 100, opacity: number = 1): void => {
        // create img node
        let imageObj = new Image();
        imageObj.src = img;
        const imgNode = new Konva.Image({
          x,
          y,
          image: imageObj,
          width,
          height,
          name: 'image',
          draggable: true,
          opacity,
        });
        // add the shape to the layer
        this.layer.add(imgNode);
        this.layer.batchDraw();
        // handleTransform event
        imgNode.on('transform', function () {
          // reset scale
          imgNode.setAttrs({
            width: imgNode.width() * imgNode.scaleX(),
            height: imgNode.height() * imgNode.scaleY(),
            scaleX: 1
          });
        });
    
        this.elements.push(imgNode);
      }

      public addDecoration = (decoration: Decoration) => {
        if (decoration.type == "rect") {// if rectangle
          const rectNode = new Konva.Rect({
            x: decoration.position.x,
            y: decoration.position.y,
            width: decoration.width,
            height: decoration.height,
            fill: decoration.fill,
            draggable: true,
          });
          // add the rect to the layer
          this.layer.add(rectNode);
          this.layer.batchDraw();
        }
      }

      public addText = (text: string = "Entrez un texte ici (double cliquez)", x: number = 50, y: number = 50, style: TextStyle) => {
        const textNode = new Konva.Text({
          text,
          x,
          y,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          fontStyle: style.fontStyle,
          fill: style.fill,
          align: style.align,
          draggable: true,
          rotation: style.rotation,
          width: style.width,
          height: style.height,
        });
  
        this.layer.add(textNode);
        this.layer.draw();

        // redraw the layer after 2 seconds to wait for the font-family to be loaded
        setTimeout(() => {
          this.layer.draw();
        }, 5000);

  
        textNode.on('dblclick', () => {
          // create textarea over canvas with absolute position
  
          // first we need to find position for textarea
          // how to find it?
  
          // at first lets find position of text node relative to the stage:
          // const textPosition = textNode.getAbsolutePosition();
  
          // then lets find position of stage container on the page:
          // const stageBox = this.stage.container().getBoundingClientRect();
  
          // so position of textarea will be the sum of positions above:
          // const areaPosition = {
          //   x: stageBox.left + textPosition.x,
          //   y: stageBox.top + textPosition.y
          // };
  
          // create textarea and style it
          const modal = document.getElementById("myModal");
          modal.style.display = "block";
          const textarea = document.createElement('textarea');
          const modalContent = document.getElementById("myModalContent");
          modalContent.appendChild(textarea);
          //document.body.appendChild(textarea);
  
          textarea.value = textNode.text();
          // textarea.style.position = 'absolute';
          // textarea.style.top = areaPosition.y + 'px';
          // textarea.style.left = areaPosition.x + 'px';
          // textarea.style.width = textNode.width() + "";
  
          textarea.focus();
  
          textarea.addEventListener('keydown', (e) => {
            // hide on enter
            if (e.keyCode === 13) {
              textNode.text(textarea.value);
              this.layer.draw();
              document.getElementById("myModalContent").removeChild(textarea);
              document.getElementById("myModal").style.display = "none";
              //document.body.removeChild(textarea);
            }
          });
        });
      }
}