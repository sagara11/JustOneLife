const Authorize = artifacts.require("Authorize");
const MedicalRecord = artifacts.require("MedicalRecord");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("MedicalRecord", function (accounts) {
  let ipfsHash = "279b0e8d48c3ad958e4bdcbe2f208474";
  let ipfsHash_2 = "279b0e8d48c3ad958e4bdcbe2f208475";

  before(async () => {
    authorizeInstance = await Authorize.deployed();
    await authorizeInstance.setManager(accounts[1], {from: accounts[0]});
    await authorizeInstance.setDoctor(accounts[1], accounts[2], {
      from: accounts[1],
    });

    medicalRecord = await MedicalRecord.new(authorizeInstance.address);
    await medicalRecord.addMedicalRecord(accounts[3], ipfsHash, {
      from: accounts[2],
    });
  });

  describe("add new Medical Record and get state of the record", async () => {
    before("add new Medical Record using accounts[0]", async () => {
      expectedState = 0;
      expectedTotalPending = 1;
      expectedIpfsHash = ipfsHash;
    });

    it("The total pending should be equal to 1", async () => {
      const medicalRecordInfo = await medicalRecord.userToMedicalRecords(
        accounts[3]
      );

      assert.equal(
        medicalRecordInfo.totalPending,
        expectedTotalPending,
        "The default state of new medical record should be PENDING"
      );
    });

    it("The new medical record should have pending status", async () => {
      const recordData = await medicalRecord.userToData(accounts[3], 0);

      assert.equal(
        recordData.recordStatus,
        expectedState,
        "The default state of new medical record should be PENDING"
      );
    });

    it("The new medical record should have the same ipfshash", async () => {
      const recordData = await medicalRecord.ipfsToRecordData(ipfsHash);

      assert.equal(
        recordData.ipfsHash,
        expectedIpfsHash,
        "The new medical record should be belonged to account[1]"
      );
    });
  });

  describe("Change new state for medical record", async () => {
    before("add new Medical Record using accounts[0]", async () => {
      await medicalRecord.changeState(accounts[3], ipfsHash, 1, {
        from: accounts[2],
      });
      expectedTotalApproved = 1;
      expectedTotalPending = 0;
    });

    it("The new total approved should be equal to 1", async () => {
      const medicalRecordInfo = await medicalRecord.userToMedicalRecords(
        accounts[3]
      );

      assert.equal(
        medicalRecordInfo.totalApproved,
        expectedTotalApproved,
        "The new total approved should be equal to 1"
      );
    });

    it("The new total pending should be equal to 0", async () => {
      const medicalRecordInfo = await medicalRecord.userToMedicalRecords(
        accounts[3]
      );

      assert.equal(
        medicalRecordInfo.totalPending,
        expectedTotalPending,
        "The new total pending should be equal to 0"
      );
    });

    it("The new status should be APPROVED", async () => {
      const recordData = await medicalRecord.ipfsToRecordData(ipfsHash);

      assert.equal(
        recordData.recordStatus,
        expectedTotalApproved,
        "The new state should be APPROVED"
      );
    });
  });

  describe("Get medical record with pre-defined state", async () => {
    before("add new Medical Record using accounts[0]", async () => {
      await medicalRecord.addMedicalRecord(accounts[3], ipfsHash_2, {
        from: accounts[2],
      });
      await medicalRecord.changeState(accounts[3], ipfsHash_2, 1, {
        from: accounts[2],
      });

      expectedSize = 2;
      expectedUser = accounts[0];
      expectedTotalApproved = 1;
      expectedStatus = 1;
    });

    it("The query should equal to 2", async () => {
      const tmpArr = await medicalRecord.getMedicalRecord(accounts[3], 1);
      assert.equal(
        tmpArr.length,
        expectedSize,
        "The size of array should equal to 2"
      );
    });

    it("The new total medical record approved", async () => {
      const tmpArr = await medicalRecord.getMedicalRecord(accounts[3], 1);
      const recordData_1 = await medicalRecord.ipfsToRecordData(tmpArr[0]);
      const recordData_2 = await medicalRecord.ipfsToRecordData(tmpArr[1]);

      assert.equal(
        recordData_1.recordStatus,
        expectedStatus,
        "The new total medical record approved"
      );
      assert.equal(
        recordData_2.recordStatus,
        expectedStatus,
        "The new total medical record approved"
      );
    });
  });
});
