const style = `
    :host {
        display: block;
        overflow: auto;
    }

    h2 {
        margin-block-start: 0;
    }

    details {
        margin-block-end: .2em;
    }
    details[open] {
        border-block-end: 1px solid rgba(200, 200, 200, .1);
    }

    summary {
        display: flex;
        font-weight: bold;
        flex-direction: row;
        flex-wrap: wrap;
        cursor: pointer;
        padding-block-end: .2em;
        border-block-end: 1px solid rgba(200, 200, 200, .1);
    }

    summary::before {
        content: '▼';
        margin-inline-end: .5em;
        transform: rotate(-90deg);
        transition: transform .2s;
    }
    details[open] summary::before {
        transform: rotate(0deg);
    }

    summary .amount {
        margin-inline-start: auto;
    }

    table {
        padding-block: .5em;
        width: 100%;
    }

    th {
        text-align: left;
    }

    td {
        padding: 2px;
    }

    .amount {
        text-align: right;
        font-family: monospace;
    }
    th.amount {
        font-family: inherit;
    }

    .warning {
        color: #f00;
    }
`;

export { style };
