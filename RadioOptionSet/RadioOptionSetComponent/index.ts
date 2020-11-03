import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class RadioOptionSetComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	// Value of the field is stored and used inside the control
	private _selected: number | undefined;
	// Power Apps component framework framework delegate which will be assigned to this object which would be called whenever an update happens.
	private _notifyOutputChanged: () => void;
	// input element that is used to create the range slider
	private _inputElement: HTMLInputElement;
	private _tableElement: HTMLTableElement;
	// reference to the control container HTMLDivElement
	private eleMainContainer: HTMLDivElement;
	// Event Handler 'refreshData' reference
	private _refreshData: EventListenerOrEventListenerObject;
	private _outputValue: number | null;
	private _defaultValue: number | undefined;
	private optionSetArray: | ComponentFramework.PropertyHelper.OptionMetadata[] | undefined;
	private _context: ComponentFramework.Context<IInputs>;
	private _container: HTMLDivElement;

	/**
	 * Empty constructor.
	 */
	constructor() {

	}
	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement)
	{// Initialize Component variables
		this._container = container;
		this._context = context;
		this._notifyOutputChanged = notifyOutputChanged;
		this._refreshData = this.refreshData.bind(this);
		context.mode.trackContainerResize(false);
		// Get all options
		this.optionSetArray =
			context.parameters.sampleProperty.attributes?.Options;

		this.eleMainContainer = document.createElement("div");

		
		this.eleMainContainer.id = "mybtn";
		this.eleMainContainer.className = "radioClass";
		let height = 0;

		// Create OptionSet Buttons
		if (this.optionSetArray) {
			for (var i = 0; i < this.optionSetArray.length; i++) {
				this._inputElement = document.createElement("input");
				var label = document.createElement("label");
				label.innerHTML = this.optionSetArray![i].Label;
				this._inputElement.type = "radio";
				this._inputElement.name = "radioName";
				this._inputElement.value = this.optionSetArray![i].Value.toString();

				if (this._inputElement.value == context.parameters.sampleProperty.raw?.toString()) {
					this._inputElement.checked = true;
				}

				var br = document.createElement("br");
				this._inputElement.addEventListener("click", this._refreshData);
				this.eleMainContainer.appendChild(br);
				this.eleMainContainer.appendChild(this._inputElement);
				this.eleMainContainer.appendChild(label);
			}
		}

		this.eleMainContainer.style.height = "auto";
		container.appendChild(this.eleMainContainer);
	}

	public refreshData(evt: Event): void
	{
		let radio = evt.target as HTMLInputElement;
		this._outputValue = (radio.value as any) as number;

		this._notifyOutputChanged();
	}
	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		let currentInputData = context.parameters.sampleProperty.raw || null;
		if (currentInputData != null) {
			this._outputValue = currentInputData;
		}
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs {
		return {
			sampleProperty:this._outputValue == null ? -1 : this._outputValue
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void {
		// Add code to cleanup control if necessary
		this._inputElement.removeEventListener("input", this._refreshData);
	}
}