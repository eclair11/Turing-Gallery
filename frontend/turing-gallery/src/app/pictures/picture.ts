const MO = 1000000;
const MAX_SIZE = 20 * MO;

export class Picture {

    url: string;
    size: number;
    height: number;
    width: number;
    isValid: boolean;
    file: File;

    constructor(url:string, height:number, width:number, file:File) {
        this.url = url;
        this.height = height;
        this.width = width;
        this.isValid = file.size < MAX_SIZE;
        this.file = file;
        this.size = file.size;
    }
}