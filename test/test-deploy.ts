import { ethers } from "hardhat"
import { expect, assert } from "chai"
import {SimpleStorage, SimpleStorage__factory} from "../typechain-types"

describe("SimpleStorage", function () {
  let SimpleStorageFactory: SimpleStorage__factory
  let SimpleStorage: SimpleStorage
  beforeEach(async function () {
    SimpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
    SimpleStorage = await SimpleStorageFactory.deploy()
  })

    it("Shoud start with a favorite number of 0.", async function(){
      const currentValue = await SimpleStorage.retrieve()
      const expectedValue = "0"
      assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update when we call store", async function(){
      const expectedValue = "7"
      const transactionResponse = await SimpleStorage.store(expectedValue)
      await transactionResponse.wait(1)

      const currentValue = await SimpleStorage.retrieve()
      assert.equal(currentValue.toString(), expectedValue)
      // expect(currentValue.toString()).to.equal(expectedValue)
    }) 
})

// const { ethers } = require("hardhat")
// const { expect, assert } = require("chai")

// 
// describe("SimpleStorage", function () {
//   let simpleStorageFactory, simpleStorage
//   beforeEach(async function () {
//     simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
//     simpleStorage = await simpleStorageFactory.deploy()
//   })

//   it("Should start with a favorite number of 0", async function () {
//     const currentValue = await simpleStorage.retrieve()
//     const expectedValue = "0"
//     // assert
//     // expect
//     assert.equal(currentValue.toString(), expectedValue)
//     // expect(currentValue.toString()).to.equal(expectedValue)
//   })
//   it("Should update when we call store", async function () {
//     const expectedValue = "7"
//     const transactionResponse = await simpleStorage.store(expectedValue)
//     await transactionResponse.wait(1)

//     const currentValue = await simpleStorage.retrieve()
//     assert.equal(currentValue.toString(), expectedValue)
//   })

//   // Extra - this is not in the video
//   it("Should work correctly with the people struct and array", async function () {
//     const expectedPersonName = "Patrick"
//     const expectedFavoriteNumber = "16"
//     const transactionResponse = await simpleStorage.addPerson(
//       expectedPersonName,
//       expectedFavoriteNumber
//     )
//     await transactionResponse.wait(1)
//     const { favoriteNumber, name } = await simpleStorage.people(0)
//     // We could also do it like this
//     // const person = await simpleStorage.people(0)
//     // const favNumber = person.favoriteNumber
//     // const pName = person.name

//     assert.equal(name, expectedPersonName)
//     assert.equal(favoriteNumber, expectedFavoriteNumber)
//   })
// })