export class LanguageDictionary {
    public id?: string;
    public dictionary: any;

    constructor() {
        this.dictionary = {};
    }

    addFrom(language: any): boolean {
        if (typeof language != "object" 
            && language != null
            && typeof language.id == "string"
            && (!this.id || language.id == this.id)
            && typeof language.dictionary == "object"
            && language.dictionary != null
        )
        {
            return false;
        }

        if (!this.id)
        {
            this.id = language.id.trim().toLowerCase();
        }

        var root = language.root;
        if (typeof root !== "string" || root.trim() == "")
            root = "";

        this.recursiveMerge(language.dictionary, root);
        return true;
    }

    recursiveMerge(section: any, parentSection: string = "") {
        for(var k in section) {
            var key = parentSection + k.trim();
            var value = section[k];
            if (typeof value === "string") {
                this.dictionary[key] = value;
            }
            if (typeof value === "object" && value != null) {
                this.recursiveMerge(value, key + ".");
            }
        }
    }

    translate(text: string): string {
        if (this.dictionary[text]) {
            return this.dictionary[text];
        }
        return text;
    }
}