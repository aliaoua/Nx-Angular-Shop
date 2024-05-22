import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'ui-gallery',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './gallery.component.html',
})
export class GalleryComponent {
    @Input() selectedImage!: string
    @Input() gallery: string[] = []
    changeSelectedImage(image: string) {
        if (!this.gallery.includes(this.selectedImage)) {
            this.gallery.push(this.selectedImage)
        }
        this.selectedImage = image
    }
}
