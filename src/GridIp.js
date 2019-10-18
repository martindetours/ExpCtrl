import React, { useState, useEffect } from "react";
import { Grid, Switch, TextField, Checkbox, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import "./GridIp.css";
import "./GridIpCoaOptions";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import Select from "react-select";
import GridIpCoaOptions from "./GridIpCoaOptions";
import GridIpLfaOptions from "./GridIpLfaOptions";
import Tabletop from "tabletop";
let expCtrlUrl = "1rV81uAIE5PTIZHeWhFwGm582oJC0-QSA40ZuUpfWwh0";
let coaValue, lfaValue, dfVatAmt, dfWhtAmt;
let docTit = null;
const GridIp = () => {
  const [pickDocDate, setPickDocDate] = useState(new Date());
  const [values, setValues] = useState({
    yyyy: null,
    mm: null,
    dd: null,
    nvwAmt: 0.0,
    lfaValue: null,
    coaValue: null,
    refDoc: null,
    vatSwitch: false,
    vatFav: false,
    vbAmt: 0.0,
    vatAmt: 0.0,
    branchId: "00000",
    whtSwitch: false,
    whfFav: false,
    whtAmt: 0.0,
    astSwitch: false,
    astFav: false
  });
  useEffect(() => {
    dfVatAmt = values.vbAmt * 0.07;
    dfWhtAmt = values.vbAmt * 0.03;
//    document.title = docTit.concat("v",dfVatAmt,"w",dfWhtAmt);
    console.log(dfVatAmt);
    console.log(dfWhtAmt);
  });
  const onCoaChange = (coa, actionMetaCoa) => {
    coaValue = coa.value;
    console.log(coa.value);
  };
  const onLfaChange = (lfa, actionMetalfa) => {
    lfaValue = lfa.value;
    console.log(lfa.value);
  };
  const handleDocDateChange = date => {
    setPickDocDate(date);
  };
  const handleChange = event => {
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
    if (
      id === "vatSwitch" ||
      id === "whtSwitch" ||
      id === "astSwitch" ||
      id === "vatFav" ||
      id === "whtFav" ||
      id === "astFav"
    ) {
      setValues({ ...values, [id]: !values[id] });
    }
  };
  const handleSubmit = event => {
    let [yyyy, mm, dd] = format(pickDocDate, "yyyy.MM.dd").split(".");
    let expdata = [
      yyyy,
      mm,
      dd,
      values.nvwAmt,
      coaValue,
      lfaValue,
      values.refDoc,
      values.vatSwitch,
      values.vbAmt,
      values.vatAmt,
      values.branchId,
      values.whtSwitch,
      values.whtAmt,
      values.astSwitch
    ];
    // let expdata = [format(pickDocDate, 'dd.MM.yyyy').split("."), values.Switch];
    console.log(expdata);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container class="container">
        <Grid item class="date_area">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              autoOk
              required
              id="docDate"
              label="Document Date"
              format="dd.MM.yyy"
              inputVariant="outlined"
              value={pickDocDate}
              onChange={handleDocDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item class="vbAmt_area">
          <TextField
            id="vbAmt"
            disabled={!values.vatSwitch}
            label="VAT Base Amount"
            onChange={handleChange}
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item class="nvwAmt_area">
          <TextField
            id="nvwAmt"
            label="No VAT Amount"
            onChange={handleChange}
            type="number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item class="vs_area">
          <Switch
            id="vatSwitch"
            checked={values.vatSwitch}
            onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Checkbox
            id="vatFav"
            disabled={!values.vatSwitch}
            checked={values.vatFav}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            color="secondary"
          />
        </Grid>
        <Grid item class="ws_area">
          <Switch
            id="whtSwitch"
            checked={values.whtSwitch}
            onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Checkbox
            id="whtFav"
            disabled={!values.whtSwitch}
            checked={values.whtFav}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            color="secondary"
          />
        </Grid>
        <Grid item class="as_area">
          <Switch
            id="astSwitch"
            checked={values.astSwitch}
            onChange={handleChange}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Checkbox
            id="astFav"
            disabled={!values.astSwitch}
            checked={values.astFav}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            onChange={handleChange}
            color="secondary"
          />
        </Grid>
        <Grid item class="vat_area">
          <TextField
            id="vatAmt"
            defaultValue={dfVatAmt}
            disabled={!values.vatSwitch}
            label="VAT"
            onChange={handleChange}
            type="number"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item class="wht_area">
          <TextField
            id="whtAmt"
            disabled={!values.whtSwitch}
            label="WHT"
            onChange={handleChange}
            type="number"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item class="ast_area">
          <TextField
            id="astAmt"
            disabled={!values.astSwitch}
            label="Asset Depre"
            onChange={handleChange}
            type="number"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item class="lfa_area">
          <Select
            id="lfa"
            placeholder="ชื่อผู้ขาย"
            options={GridIpLfaOptions}
            onChange={onLfaChange}
          />
        </Grid>
        <Grid item class="coa_area">
          <Select
            id="coa"
            placeholder="ผังบัญชี"
            options={GridIpCoaOptions}
            onChange={onCoaChange}
          />
        </Grid>
        <Grid item class="bnh_area">
          <TextField
            id="bchId"
            disabled={!values.vatSwitch}
            defaultValue={values.branchId}
            label="สาขาที่"
            onChange={handleChange}
            type="number"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item class="ref_area">
          <TextField
            id="refDoc"
            required
            label="เลขที่ใบกำกับภาษี"
            onChange={handleChange}
            type="text"
            InputLabelProps={{ shrink: true }}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item class="sum_area">
          <Button
            type="submit"
            color="primary"
            margin="normal"
            variant="contained"
          >
            Send{" "}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default GridIp;
