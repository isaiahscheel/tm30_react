  <div style={{ position: "inherit" }}>
    {/*}
    <LightTooltip
      title="Wavelength values generated automatically. 
        Power values entered by user."
      placement="right-start"
    >
      <textarea onChange={this.handleSPDChange}></textarea>
    </LightTooltip>
  */}
    {/*}
    <ReactDataSheet
      data={this.state.grid}
      valueRenderer={cell => cell.value}
      onCellsChanged={changes => {
        const grid = this.state.grid.map(row => [...row]);
        changes.forEach(({ cell, row, col, value }) => {
          grid[row][col] = { ...grid[row][col], value };
        });
        this.setState({ grid });
      }}
    />
    */}
    {this.props.paste_open ? (
      <div>
        <h3>SPD Data</h3>
        <label>
          Name of SPD:
          <br />
          <input
            onChange={this.handleNameChange}
            defaultValue={""}
          ></input>
        </label>

        <br />
        <SPDxWavelength
          spd={this.props.SPDxWavelength.spd}
          wavelength={this.props.SPDxWavelength.wavelengths}
        />
        <br />

        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
            this.updateGraph();
          }}
        />
      </div>
    ) : (
      <div></div>
    )}