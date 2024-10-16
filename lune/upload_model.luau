local remodel = require("./remodel")

local place = remodel.readPlaceFile("gamefile.rbxl")
if not place then
    error("Place file not found")
end
local model = place.ReplicatedStorage:FindFirstChild("hyperdriveAsset")
if not model then
    error("Model 'hyperdriveAsset' not found")
end
if not model or model.ClassName ~= "Model" then
    error("Expected a Model, got " .. (model and model.ClassName or "nil"))
end

remodel.writeExistingModelAsset(model, "17551848009")
print("Updated Asset")

