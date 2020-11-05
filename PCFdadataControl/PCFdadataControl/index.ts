import {IInputs, IOutputs} from "./generated/ManifestTypes";

    interface IDadataValues {
        postal_code?: any;
        country: string;
        country_iso_code: string;
        federal_district?: any;
        region_fias_id: string;
        region_kladr_id: string;
        region_iso_code: string;
        region_with_type: string;
        region_type: string;
        region_type_full: string;
        region: string;
        area_fias_id?: any;
        area_kladr_id?: any;
        area_with_type?: any;
        area_type?: any;
        area_type_full?: any;
        area?: any; 
        city_fias_id: string;
        city_kladr_id: string; 
        city_with_type: string;
        city_type: string;
        city_type_full: string;
        city: string;
        city_area?: any;
        city_district_fias_id?: any;
        city_district_kladr_id?: any;
        city_district_with_type?: any;
        city_district_type?: any;
        city_district_type_full?: any;
        city_district?: any;
        settlement_fias_id?: any;
        settlement_kladr_id?: any;
        settlement_with_type?: any;
        settlement_type?: any;
        settlement_type_full?: any;
        settlement?: any;
        street_fias_id: string;
        street_kladr_id: string;
        street_with_type: string;
        street_type: string;
        street_type_full: string;
        street: string;
        house_fias_id?: any;
        house_kladr_id?: any;
        house_type?: any;
        house_type_full?: any;
        house?: any;
        block_type?: any;
        block_type_full?: any;
        block?: any;
        flat_type?: any;
        flat_type_full?: any;
        flat?: any;
        flat_area?: any;
        square_meter_price?: any;
        flat_price?: any;
        postal_box?: any;
        fias_id: string;
        fias_code?: any;
        fias_level: string;
        fias_actuality_state?: any;
        kladr_id: string;
        geoname_id?: any;
        capital_marker: string;
        okato: string;
        oktmo: string;
        tax_office: string;
        tax_office_legal: string;
        timezone?: any;
        geo_lat?: any;
        geo_lon?: any;
        beltway_hit?: any;
        beltway_distance?: any;
        metro?: any;
        qc_geo?: any;
        qc_complete?: any;
        qc_house?: any;
        history_values: string[];
        unparsed_parts?: any;
        source?: any;
        qc?: any;
    }
    interface IDadataSuggestion {
        value: string;
        unrestricted_value: string;
        data: IDadataValues;
    }
    interface IDadata {
        suggestions: IDadataSuggestion[];
    }



export class PCFdadataControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _inputElement: HTMLInputElement;
    private _labelElement1: HTMLLabelElement;
    private _labelElement2: HTMLLabelElement;
    private _labelElement3: HTMLLabelElement;
	private eleMainContainer: HTMLDivElement;
    private _outputValue: string | null;
    private _value: string;
	private _context: ComponentFramework.Context<IInputs>;
    private _container: HTMLDivElement;
    private _notifyOutputChanged: () => void;
    private _refreshData: EventListenerOrEventListenerObject;

	constructor()
	{

	}
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
    {
		this._container = container;
        this._context = context;
        this._notifyOutputChanged = notifyOutputChanged;
        this._refreshData = this.refreshData.bind(this);
		context.mode.trackContainerResize(false);
        
        this.eleMainContainer = document.createElement("div");

		this.eleMainContainer.id = "dadataInfo";
		this.eleMainContainer.className = "dadataClass";
        this._inputElement = document.createElement("input");
        this._inputElement.className = "inputClass";
        this._inputElement.type = "text";
        this._inputElement.placeholder = "Введите адрес";
        this._inputElement.id = "input";
        this._inputElement.value = context.parameters.sampleProperty.raw!;
        this._value = context.parameters.sampleProperty.raw!;
        this.eleMainContainer.addEventListener("focusout", this._refreshData);
        this._inputElement.addEventListener("input", this._refreshData);
        this._inputElement.addEventListener("change", this._refreshData);
        var br = document.createElement("br");

        this._labelElement1 = document.createElement("label");
        this._labelElement1.id = "1";
        this._labelElement1.addEventListener("click", this._refreshData);
        this._labelElement1.addEventListener("mouseover", this._refreshData);
        this._labelElement1.addEventListener("mouseleave", this._refreshData);
        var br1 = document.createElement("br");
        this._labelElement1.hidden = true;

        this._labelElement2 = document.createElement("label");
        this._labelElement2.id = "2";
        this._labelElement2.addEventListener("click", this._refreshData);
        this._labelElement2.addEventListener("mouseover", this._refreshData);
        this._labelElement2.addEventListener("mouseleave", this._refreshData);
        var br2 = document.createElement("br");
        this._labelElement2.hidden = true;

        this._labelElement3 = document.createElement("label");
        this._labelElement3.id = "3";
        this._labelElement3.addEventListener("click", this._refreshData);
        this._labelElement3.addEventListener("mouseover", this._refreshData);
        this._labelElement3.addEventListener("mouseleave", this._refreshData);
        var br3 = document.createElement("br");
        this._labelElement3.hidden = true;


        this.eleMainContainer.appendChild(this._inputElement);
        this.eleMainContainer.appendChild(br);
        this.eleMainContainer.appendChild(this._labelElement1);
        this.eleMainContainer.appendChild(br1);
        this.eleMainContainer.appendChild(this._labelElement2);
        this.eleMainContainer.appendChild(br2);
        this.eleMainContainer.appendChild(this._labelElement3);
        this.eleMainContainer.appendChild(br3);
		container.appendChild(this.eleMainContainer);
	}

    public refreshData(evt: Event): void
    {
        function hideLabel(){
            if (document.activeElement != document.getElementById("input")) {
                document.getElementById("1")!.style.display = "none";
                document.getElementById("2")!.style.display = "none";
                document.getElementById("3")!.style.display = "none";
            }
        }
        
        if (evt.type == "input" || evt.type == "change")
        {
            this._value = this._inputElement.value;
            this._labelElement1.hidden = false;
            this._labelElement2.hidden = false;
            this._labelElement3.hidden = false;

            this._labelElement1.style.display = "inline-block";
            this._labelElement2.style.display = "inline-block";
            this._labelElement3.style.display = "inline-block";

            if (this._inputElement.value == "")
            {
                this._labelElement1.style.display = "none";
                this._labelElement2.style.display = "none";
                this._labelElement3.style.display = "none";
            }
        }
        if (evt.type == "click")
        {
            let label = evt.target as HTMLLabelElement;
            this._inputElement.value = label.innerText;
            document.getElementById("input")!.focus();
        }
        if (evt.type == "mouseover")
        {
            let label = evt.target as HTMLLabelElement;
            label.style.backgroundColor = "#0768fa";
            label.style.color = "white";
        }
        if (evt.type == "mouseleave")
        {
            let label = evt.target as HTMLLabelElement;
            label.style.backgroundColor = "white";
            label.style.color = "dimgray"
        }
        if (evt.type == "focusout") {
            setTimeout(hideLabel, 100);
        }
        this._notifyOutputChanged();
    }


    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        var token = "4ca8954e3e3bdc1945c17f4979c1950b390bf569";
        var query = this._value;

        var options = {
            method: "POST",
            mode: "cors" as RequestMode,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({ query: query })
        }

        fetch(url, options)
            .then(response => response.text())
            .then(result => this._labelElement1.innerHTML = (JSON.parse(result) as IDadata).suggestions[0].value)
            .catch(error => console.log("error", error));
        
        
        fetch(url, options)
            .then(response => response.text())
            .then(result => this._labelElement2.innerHTML = (JSON.parse(result) as IDadata).suggestions[1].value)
            .catch(error => console.log("error", error));

        
        fetch(url, options)
            .then(response => response.text())
            .then(result => this._labelElement3.innerHTML = (JSON.parse(result) as IDadata).suggestions[2].value)
            .catch(error => console.log("error", error));
    }

	public getOutputs(): IOutputs
	{
		return {
            sampleProperty: this._inputElement.value
		};
	}
	public destroy(): void
	{
        this._inputElement.removeEventListener("input", this._refreshData);
        this._inputElement.removeEventListener("click", this._refreshData);
        this._inputElement.removeEventListener("mouseover", this._refreshData);
        this._inputElement.removeEventListener("mouseleave", this._refreshData);
        this._inputElement.removeEventListener("change", this._refreshData);
        this._inputElement.removeEventListener("focusout", this._refreshData);
	}
}