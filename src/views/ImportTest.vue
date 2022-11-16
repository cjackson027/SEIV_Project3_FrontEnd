import jsPDF from 'jsPDF'

export default {
	name: 'home',
	data() {
		return {
			name: ''
		}
	},
	methods: {
		download () { 
            let pdfName = 'test'; 
            var doc = new jsPDF();
            doc.text(this.name, 10, 10);
            doc.save(pdfName + '.pdf');
        }
	}
}

