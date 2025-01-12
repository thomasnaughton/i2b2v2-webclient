/**
 * @projectDescription	The SDX controller library for the PatientRecord data-type.
 * @namespace	i2b2.sdx.TypeControllers.PR
 * @inherits 	i2b2.sdx.TypeControllers
 * @version 	2.0
 * @see 		i2b2.sdx
 * ----------------------------------------------------------------------------------------
 * updated 9-15-08: RC4 launch [Nick Benik]
 */
console.group('Load & Execute component file: CRC > SDX > Patient Record');
console.time('execute time');


i2b2.sdx.TypeControllers.PR = {};
i2b2.sdx.TypeControllers.PR.model = {};


// ==========================================================================
i2b2.sdx.TypeControllers.PR.getEncapsulateInfo = function() {
    // this function returns the encapsulation head information
    return {sdxType: 'PR', sdxKeyName: 'patient_id', sdxControlCell:'CRC', sdxDisplayNameKey: 'title'};
};


// ==========================================================================
i2b2.sdx.TypeControllers.PR.RenderData = function(sdxData, options) {
    // function returns following data that is used for rendering (at a minimum)
    // === title
    // === iconImg (url)
    // === cssClassMain
    // === cssClassMinor
    // === moreDescriptMain
    // === moreDescriptMinor
    // === tvNodeState
    if (options === undefined) { options = {}; }
    // default PR icons
    if (!$.isArray(options.icon)) {
        if (typeof options.icon === 'string') {
            let t = options.icon;
            options.icon = {
                root: t,
                rootExp: t,
                branch: t,
                branchExp: t,
                leaf: t
            };
        } else {
            options.icon = {
                root: 'sdx_CRC_PR.jpg',
                rootExp: 'sdx_CRC_PR.jpg',
                branch: 'sdx_CRC_PR.jpg',
                branchExp: 'sdx_CRC_PR.jpg',
                leaf: 'sdx_CRC_PR.jpg'
            };
        }
    }

    let nodeInfo = {
        title: undefined,
        iconImg: undefined,
        iconImgExp: undefined,
        cssClassMain: "sdxStyleCRC-PR",
        cssClassMinor: undefined,
        moreDescriptMain: undefined,
        moreDescriptMinor: undefined,
        annotation: undefined,
        tvNodeState: {}
    };

    if (options.cssClass !== undefined) nodeInfo.cssClassMain = options.cssClass;
    if (options.title !== undefined) {
        nodeInfo.title = options.title;
    } else  {
        nodeInfo.title = sdxData.sdxInfo.sdxDisplayName;
    }


    let bCanExp = false;
    if (options.showchildren === true) bCanExp = true;
    if (!bCanExp) {
        // cannot expand node
        nodeInfo.tvNodeState.loaded = true;
        nodeInfo.tvNodeState.expanded = true;
    }

    let icon = 'leaf';
    switch(icon) {
        case "root":
            nodeInfo.cssClassMinor = "tvRoot";
            break;
        case "branch":
            nodeInfo.cssClassMinor = "tvBranch";
            break;
        case "leaf":
            nodeInfo.cssClassMinor = "tvLeaf";
            break;
    }
    if (options.icon[icon] !== undefined) {
        nodeInfo.iconImg = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.icon[icon];
    }
    if (options.icon[icon+'Exp'] !== undefined) {
        nodeInfo.iconImgExp = i2b2.hive.cfg.urlFramework + 'cells/CRC/assets/'+ options.icon[icon+'Exp'];
    }
    // in cases of one set icon, copy valid icon to the missing icon
    if ((nodeInfo.iconImg === undefined) && (nodeInfo.iconImgExp !== undefined)) {	nodeInfo.iconImg = nodeInfo.iconImgExp; }
    if ((nodeInfo.iconImg !== undefined) && (nodeInfo.iconImgExp === undefined)) {	nodeInfo.iconImgExp = nodeInfo.iconImg; }

    // provide tooltip information if given
    if (typeof options.tooltip === 'string') nodeInfo.moreDescriptMinor = options.tooltip;

    return nodeInfo;
};


// ==========================================================================
i2b2.sdx.TypeControllers.PR.DropHandler = function(sdxData) {
    alert('[PatientRecord DROPPED] You need to create your own custom drop event handler.');
};


// ==========================================================================
i2b2.sdx.TypeControllers.PR.dragStartHandler = function(i2b2Data) {
    delete i2b2Data.origData.parent;
    if (i2b2Data.renderData !== undefined) delete i2b2Data.renderData.idDOM;
    return i2b2Data;
};


// ==========================================================================
console.timeEnd('execute time');
console.groupEnd();